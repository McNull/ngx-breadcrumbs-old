import { PersonResolver } from './edit/person-resolver';
import { resolve } from 'path';
import { PersonEditComponent } from './edit/person-edit.component';
import { PersonListComponent } from './list/person-list.component';
import { Routes } from '@angular/router';
import { PersonBreadcrumbResolver } from "./edit/person-breadcrumb-resolver";


const routes:Routes = [
  {
    path: '',
    component: PersonListComponent
  },
  {
    path: ':id/edit',
    component: PersonEditComponent,
    resolve: {
      person: PersonResolver
    },
    data: {
      breadcrumbs: '{{ person.name }}'
    }
  }
];

export { routes }
