
import { IBreadcrumb } from 'ngx-breadcrumbs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

export class PersonBreadcrumbResolver implements Resolve<IBreadcrumb[]> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IBreadcrumb[] {

    console.log('dddd');

    return [{
      text: 'gedoe',
      path: null
    }];
  }

}
