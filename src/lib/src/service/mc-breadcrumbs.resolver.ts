import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IBreadcrumb, stringFormat } from "../mc-breadcrumbs.shared";
import { Observable } from "rxjs/Observable";


export class McBreadcrumbsResolver {
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
     : Observable<IBreadcrumb[]> | Promise<IBreadcrumb[]> | IBreadcrumb[] {

    const data = route.routeConfig.data;
    const path = this.getPath(route);

    let text = typeof (data.breadcrumbs) === 'string' ? data.breadcrumbs : data.breadcrumbs.text || data.text || path;
    text = stringFormat(text, route.data);


    const crumbs : IBreadcrumb[] = [{
      text: text,
      path: path
    }];

    return Observable.of(crumbs);
  }

  public getPath(route: ActivatedRouteSnapshot) : string {
    return route.url.map((x) => x.path).join('/');
  }
}
