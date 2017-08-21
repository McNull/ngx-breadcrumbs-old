
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { LibService } from 'quickstart-lib';

interface INavLink {
  text: string,
  path: string,
  exact: boolean
}

@Component({
  selector: 'demo-app',
  template: `
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <ul class="navbar-nav">
            <li *ngFor="let link of navLinks" class="nav-item"
              [routerLinkActive]="['active']"
              [routerLinkActiveOptions]="link">
              <a class="nav-link" routerLink="{{ link.path }}">{{ link.text }}</a>
            </li>
          </ul>
        </div>
      </nav>

      <div class="container">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    `
      .navbar {
        margin-bottom: 20px;
      }
    `
  ]
})
export class AppComponent {

  navLinks: INavLink[];

  constructor(libService: LibService, router: Router) {
    this.navLinks = router.config.filter((x) => x.data.nav).map((x) => ({
      text: x.data.nav.text || x.data.text,
      path: x.data.nav.path || x.path,
      exact: x.data.nav.exact
    }));
  }
}
