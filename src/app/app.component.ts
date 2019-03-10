import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  pages = [
    {title: 'Dashboard', enabled: false, url: '/dashboard', icon: 'analytics'},
    {title: 'Player', enabled: false, url: '/player', icon: 'musical-note'},
    {title: 'Musics', enabled: true, url: '/musics', icon: 'musical-notes'},
    {title: 'Chat', enabled: false, url: '/chat', icon: 'chatboxes'}
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private menuController: MenuController) {
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

  /**
   * Handles logout demand.
   * Redirects to login page after it.
   */
  onLogout() {
    this.authService.logout();
    this.menuController.close();
  }

}
