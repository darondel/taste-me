import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Track } from '../models/track';
import { TopTracks } from '../models/top-tracks';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private http: HttpClient) {
  }

  /**
   * Retrieves the top tracks in the chart.
   */
  public getTopTracks(): Observable<Track[]> {
    return this.http.get<TopTracks>(
      this.toURL(environment.lastFmApi.methods.chart.topTracks, environment.lastFmApi.formats.json)
    ).pipe(
      map(topTracks => topTracks.tracks.track)
    );
  }

  /**
   * Builds the URL to access data form Last.FM API.
   *
   * @param method the method to look after
   * @param format the format to use, XML if not mentioned
   */
  private toURL(method: string, format?: string): string {
    return environment.lastFmApi.url
        + '?method=' + method
        + '&api_key=' + environment.lastFmApi.key
        + (format ? '&format=' + format : '');
  }

}
