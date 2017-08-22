import { ActivatedRouteSnapshot } from '@angular/router';
import { IBreadcrumb, McBreadcrumbsResolve } from '../../../lib/src/mc-breadcrumbs.shared';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IPerson } from './person.model';
import { Injectable } from '@angular/core';
import { utils } from "app/shared/utils";

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PersonService implements McBreadcrumbsResolve {
  constructor() { }

  private persons = new BehaviorSubject<IPerson[]>(persons);

  getAll(): Observable<IPerson[]> {
    return this.persons;
  }

  get(id: string): Promise<IPerson> {
    return this.persons
      .map(x => x.find(y => y.id === id))
      .first()
      .toPromise();
  }

  save(person: IPerson) : Promise<IPerson> {

    return new Promise((resolve) => {
      let persons = [... this.persons.getValue()];

      if (!person.id) {
        person.id = utils.guid();
        persons.push(person);
      } else {
        let idx = persons.findIndex((x) => x.id === person.id);
        persons.splice(idx, 1, person);
      }

      this.persons.next(persons);

      resolve(person);
    });
  }

  breadCrumbsResolve(breadCrumb: IBreadcrumb, route: ActivatedRouteSnapshot): IBreadcrumb[] {
    throw new Error("Method not implemented.");
  }

}

const persons = new Array<IPerson>();

for (let i = 0; i < 20; i++) {
  persons.push({
    id: utils.guid(),
    name: utils.randomWords(utils.randomInt(2, 4))
  });
}
