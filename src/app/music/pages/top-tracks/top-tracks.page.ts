import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Track } from '../../models/track';
import { MusicService } from '../../services/music.service';

@Component({
  selector: 'app-top-tracks',
  templateUrl: './top-tracks.page.html',
  styleUrls: ['./top-tracks.page.scss'],
})
export class TopTracksPage implements OnInit {

  tracks: Observable<Track[]>;

  constructor(private musicService: MusicService, private router: Router) {
  }

  ngOnInit() {
    this.tracks = this.musicService.getTopTracks();
  }

  /**
   * Handles a click on a specific track.
   *
   * @param track the track asked by the user
   */
  onClick(track: Track) {
    this.router.navigate(['/music', track.artist.name, track.name]);
  }

}
