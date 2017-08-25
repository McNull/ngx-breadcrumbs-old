import { Observable } from 'rxjs/Observable';
import { BrowseService } from './browse.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IBreadcrumb } from '../../../lib/src/mc-breadcrumbs.shared';

export class BrowseBreadcrumbsResolver implements Resolve<IBreadcrumb[]> {

  constructor(private service : BrowseService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBreadcrumb[]> {

    console.log('in resolve');

    const result = new Array<IBreadcrumb>();

    return Observable.of(result).do(() => 'in source');
  }
}
