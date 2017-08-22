import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
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

import * as _template from 'lodash.template';
import * as _templateSettings from 'lodash.templatesettings';

export function stringFormat(template: string, binding: any): string {
  _templateSettings.interpolate = /{{([\s\S]+?)}}/g;

  let compiled = _template(template);
  return compiled(binding);
}


