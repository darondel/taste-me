import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { Color } from '@ionic/core';

import { filter } from 'rxjs/operators';

import { MenuPage } from '../../models/menu-page';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @Input() pages: MenuPage[];
  @Input() routesWithoutMenu: string[];
  @Input() labelColor: Color = 'primary';
  @Input() iconColor: Color = 'secondary';

  isMenuDisabled = true;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.disableMenuIf(this.routesWithoutMenu);
  }

  /**
   * Handles logout demand.
   */
  onLogout() {
    this.authService.logout();
  }

  /**
   * Disables the menu if some page is activated.
   */
  private disableMenuIf(routes: string[]) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => this.isMenuDisabled = routes && routes.includes(event.url));
  }

}
