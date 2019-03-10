import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Track } from '../models/track';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private http: HttpClient) {
  }

  public getTopTracks(): Observable<Track[]> {
    return this.http.get<Track[]>(environment.lastFmApi.urls.topTracks + environment.lastFmApi.apiKey).pipe(
      map(json => json.tracks.track)
    );
  }

}
