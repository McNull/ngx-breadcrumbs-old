import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from "rxjs/Observable";

export interface IBreadcrumb {
  text: string,
  path: string
}

export interface IBreadcrumbData {
  text: string
}

export interface McBreadcrumbsResolve {
  breadCrumbsResolve(breadCrumb: IBreadcrumb, route: ActivatedRouteSnapshot): IBreadcrumb[];
}

// import * as _template from 'lodash.template';
// import * as _templateSettings from 'lodash.templatesettings';

const _template = require('lodash.template');
const _templateSettings = require('lodash.templatesettings');

export function stringFormat(template: string, binding: any): string {
  _templateSettings.interpolate = /{{([\s\S]+?)}}/g;

  let compiled = _template(template);
  return compiled(binding);
}

export function isPromise(value: any): boolean {
  return value && (typeof value.then === 'function');
}


export function wrapIntoObservable<T>(value: T | Promise<T> | Observable<T>)
  : Observable<T> {

  if (value instanceof Observable)
    return value;

  if (isPromise(value)) {
    // Use `Promise.resolve()` to wrap promise-like instances.
    // Required ie when a Resolver returns a AngularJS `$q` promise to correctly trigger the
    // change detection.
    return Observable.fromPromise(Promise.resolve(value));
  }

  return Observable.of(value as T);
}
