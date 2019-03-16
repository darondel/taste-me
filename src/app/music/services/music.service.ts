import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Track } from '../models/track';
import { TopTracks } from '../models/top-tracks';
import { TrackInfo } from '../models/track-info';
import { NotificationService } from '../../shared/services/notification.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private http: HttpClient, private notificationService: NotificationService) {
  }

  /**
   * Retrieves the top tracks in the chart.
   */
  public getTopTracks(): Observable<Track[]> {
    return this.http.get<TopTracks>(
      this.toURL(environment.lastFmApi.methods.chart.topTracks, environment.lastFmApi.formats.json)
    ).pipe(
      map(topTracks => topTracks.tracks.track),
      catchError(this.handleError<Track[]>())
    );
  }

  /**
   * Retrieves the additional information associated with a track.
   *
   * @param artist the artist name
   * @param track the track name
   */
  public getTrackInfo(artist: string, track: string): Observable<Track> {
    return this.http.get<TrackInfo>(
      this.toURL(environment.lastFmApi.methods.track.getInfo, environment.lastFmApi.formats.json, new Map([
        [artist.replace(' ', '+'), 'artist'],
        [track.replace(' ', '+'), 'track']
      ]))
    ).pipe(
      map(trackInfo => trackInfo.track),
      catchError(this.handleError<Track>())
    );
  }

  /**
   * Builds the URL to access data form Last.FM API.
   *
   * @param method the method to look after
   * @param format the format to use, XML if not mentioned
   * @param params other parameters to append to the URL
   */
  private toURL(method: string, format?: string, params?: Map<string, any>): string {
    let result = environment.lastFmApi.url
      + '?method=' + method
      + '&api_key=' + environment.lastFmApi.key
      + (format ? '&format=' + format : '');

    if (params) {
      params.forEach((key, value) => result += '&' + key + '=' + value);
    }

    return result;
  }

  /**
   * Provides error feedback as a notification.
   * Rethrows any error.
   */
  private handleError<T>() {
    return (error: HttpErrorResponse): Observable<T> => {
      let errorMessage = error.message;

      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }

      this.notificationService.present(errorMessage, 'danger');

      return throwError(error);
    };
  }

}
