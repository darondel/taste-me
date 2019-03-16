import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { filter } from 'rxjs/operators';

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

  isMenuDisabled = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router) {
    this.initializeApp();
    this.disableMenuIf('/login');
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
   * Disables the menu if some page is activated.
   */
  disableMenuIf(...routes: string[]) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => this.isMenuDisabled = routes.includes(event.url));
  }

  /**
   * Handles logout demand.
   * Redirects to login page after it.
   */
  onLogout() {
    this.authService.logout();
  }

}
