import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { Track } from '../../models/track';
import { MusicService } from '../../services/music.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
})
export class TrackPage implements OnInit {

  trackInfo: Observable<Track>;

  constructor(private route: ActivatedRoute, private musicService: MusicService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.trackInfo = this.musicService.getTrackInfo(params['artist'], params['track']));
  }

  /**
   * Retrieves the content of a track.
   * Indicates if no content is available.
   *
   * @param track the track
   */
  getContent(track: Track): string {
    let result = 'No content has been found for this track. Please kindly accept our apologies!';

    if (track.wiki && track.wiki.content) {
      result = track.wiki.content;
    }

    return result;
  }

}
