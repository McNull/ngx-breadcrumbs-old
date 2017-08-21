import { BrowseComponent } from './browse.component';
import { AboutComponent } from './about.component';
import { HomeComponent } from './home.component';
import { Routes } from '@angular/router';

const routes : Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      text: 'Home',
      nav: {
        exact: true
      }
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      text: 'About',
      nav: true
    }
  },
  {
    path: 'browse/:id',
    component: BrowseComponent,
    data: {
      text: 'Browse'
    }
  },
  {
    path: 'browse',
    component: BrowseComponent,
    data: {
      text: 'Browse',
      nav: {
        exact: false
      }
    }
  }
];

export { routes };
