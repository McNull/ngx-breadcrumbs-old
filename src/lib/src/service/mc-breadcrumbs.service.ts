import { Injectable } from '@angular/core';

import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterState } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from "rxjs/Subscription";

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/scan';

import { IBreadcrumb, stringFormat, wrapIntoObservable } from '../mc-breadcrumbs.shared';
import { McBreadcrumbsConfig } from "./mc-breadcrumbs.config";
import { McBreadcrumbsResolver } from './mc-breadcrumbs.resolver';

@Injectable()
export class McBreadcrumbsService {

  private _breadcrumbs = new BehaviorSubject<IBreadcrumb[]>([]);
  private _defaultResolver = new McBreadcrumbsResolver();

  constructor(private _router: Router, route: ActivatedRoute, private _config: McBreadcrumbsConfig) {

    this._router.events
      .filter((x) => x instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {

        const route = _router.routerState.snapshot.root;

        console.log('resolving');

        this._resolveCrumbs(route)
            .flatMap((x) => x)
            .scan((a, v) => {
              return {
                text: v.text,
                path: a.path + '/' + v.path
              };
            }, {
              text: null,
              path: ''
            })
            .toArray()
            .subscribe((x) => {
              console.log('resolved', x);
              this._breadcrumbs.next(x);
            });

      });
  }

  get crumbs$(): Observable<IBreadcrumb[]> {
    return this._breadcrumbs;
  }

  private _resolveCrumbs(route: ActivatedRouteSnapshot)
    : Observable<IBreadcrumb[]> {

    let crumbs$: Observable<IBreadcrumb[]>;

    const data = route.routeConfig &&
      route.routeConfig.data;

    if (data && data.breadcrumbs) {
      console.log('got data');
      let resolver = this._defaultResolver.resolve(route, this._router.routerState.snapshot);
      crumbs$ = wrapIntoObservable<IBreadcrumb[]>(resolver).first();
    } else {
      console.log('no data -> []');
      crumbs$ = Observable.of([]);
    }

    if (route.firstChild) {
      crumbs$ = crumbs$.concat(this._resolveCrumbs(route.firstChild));
    }

    return crumbs$;
  }
}
