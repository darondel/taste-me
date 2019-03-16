import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuPage } from './core/models/menu-page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  pages: MenuPage[] = [
    {title: 'Dashboard', enabled: false, url: '/dashboard', icon: 'analytics'},
    {title: 'Player', enabled: false, url: '/player', icon: 'musical-note'},
    {title: 'Musics', enabled: true, url: '/musics', icon: 'musical-notes'},
    {title: 'Chat', enabled: false, url: '/chat', icon: 'chatboxes'}
  ];
  routesWithMenu = ['/login'];

  constructor(private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar) {
    this.initializeApp();
  }

  /**
   * Initializes the application.
   */
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
