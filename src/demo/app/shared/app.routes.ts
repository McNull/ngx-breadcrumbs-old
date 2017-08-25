import { BrowseBreadcrumbsResolver } from '../browse/browse-breadcrumbs.resolver';
import { PersonListComponent } from '../person/list/person-list.component';
import { BrowseComponent } from '../browse/browse.component';
import { AboutComponent } from '../components/about.component';
import { HomeComponent } from '../components/home.component';
import { Routes } from '@angular/router';
import { PersonModule } from "../person/person.module";
import { browseRoutes } from "../browse/browse.routes";

const routes : Routes = [
  {
    path: '',
    component: HomeComponent,

    data: {
      text: 'Home',
      nav: {
        exact: true,
      },
      breadcrumbs: true
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      text: 'About',
      nav: true,
      breadcrumbs: true
    }
  },
  {
    path: 'person',
    loadChildren: () => PersonModule,
    data: {
      text: 'Persons',
      nav: true,
      breadcrumbs: true
    }
  },
  {
    path: 'browse',
    data: {
      text: 'Browse',
      nav: true,
      breadcrumbs: true
    },
    children: browseRoutes
  }
];

export { routes };
