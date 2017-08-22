import { Injectable } from '@angular/core';
import { IBreadcrumb } from "../mc-breadcrumbs.shared";
@Injectable()
export class McBreadcrumbsConfig {

  private _prefixCrumbs : IBreadcrumb[] = [
    {
      path: '/',
      text: 'Home'
    }
  ];

  set prefixCrumbs(value: IBreadcrumb[]) {
    this._prefixCrumbs = [].concat(value);
  }

  get prefixCrumbs() : IBreadcrumb[] {
    return this._prefixCrumbs;
  }
}
