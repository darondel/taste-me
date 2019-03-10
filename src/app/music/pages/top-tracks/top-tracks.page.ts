import { Component, OnInit } from '@angular/core';

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

  constructor(private musicService: MusicService) {
  }

  ngOnInit() {
    this.tracks = this.musicService.getTopTracks();
  }

}
