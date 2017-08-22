import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterState } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { IBreadcrumb, stringFormat } from "../mc-breadcrumbs.shared";
import { McBreadcrumbsConfig } from "./mc-breadcrumbs.config";

@Injectable()
export class McBreadcrumbsService {

  private _breadcrumbs = new BehaviorSubject<IBreadcrumb[]>([]);

  constructor(private _router: Router, route: ActivatedRoute, private _config: McBreadcrumbsConfig) {

    this._router.events
      .filter((x) => x instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {

        const snapshot = _router.routerState.snapshot.root;
        let crumbs = new Array<IBreadcrumb>();
        const path = '';

        this._buildCrumbPath(snapshot, crumbs, path).then(() => {
          crumbs = this._config.prefixCrumbs.concat(crumbs).filter((x, idx, self) => {
            return self.findIndex((y) =>
              y.path === x.path && y.text === x.text
            ) === idx;
          });

          this._breadcrumbs.next(crumbs);
        });
      });
  }

  get crumbs$(): Observable<IBreadcrumb[]> {
    return this._breadcrumbs;
  }

  private _buildCrumbPath(snapshot: ActivatedRouteSnapshot, crumbs: IBreadcrumb[], path: string): Promise<any> {

    return new Promise((resolve) => {
      // snapshot.data is a merged result combined from all parents, so we
      // use the original routeConfig values.

      const data = snapshot.routeConfig &&
        snapshot.routeConfig.data;

      if (data && data.breadcrumbs) {

        const pathSnapshot = snapshot.url.map((x) => x.path).join('/');
        path += '/' + pathSnapshot;

        const crumb: IBreadcrumb = {
          text: typeof (data.breadcrumbs) === 'string' ? data.breadcrumbs : data.breadcrumbs.text || data.text || pathSnapshot,
          path: path
        };

        crumb.text = stringFormat(crumb.text, snapshot.data);
        crumbs.push(crumb);
      }

      if (snapshot.firstChild) {
        this._buildCrumbPath(snapshot.firstChild, crumbs, path).then(resolve);
      } else {
        resolve();
      }
    });
  }

}
