import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Component, Injectable, OnDestroy } from '@angular/core';
import { utils } from './utils';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

////////////////////////////////////////////////////////////////////

@Injectable()
class BrowseService {

  private folders = new BehaviorSubject<IFolder[]>([]);

  constructor() {
    this.folders.next(folders);
  }

  get(parentId: string): Observable<IFolder[]> {
    return this.folders.map((x) => {
      return x.filter((y) => y.parentId === parentId);
    });
  }
}

////////////////////////////////////////////////////////////////////

@Component({
  templateUrl: './browse.component.html',
  providers: [BrowseService]
})
export class BrowseComponent implements OnDestroy {

  folders: Observable<IFolder[]>;
  subscriptions = new Array<Subscription>();

  constructor(private service: BrowseService, route: ActivatedRoute) {

    const s = route.params.subscribe((x) => {
      const parentId = x.id || null;
      this.folders = this.service.get(parentId);
    });

    this.subscriptions.push(s);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}

interface IFolder {
  id: string,
  parentId: string,
  name: string
}

const folders : Array<IFolder> = [];

const minChilds = 1;
const maxChilds = 10;
const levels = 3;

function createFolders(parentId: string, level: number) {
  let count = utils.randomInt(minChilds, maxChilds);
  while(count--) {
    let id = utils.guid();
    folders.push({
      id: id,
      parentId: parentId,
      name: utils.randomWords(utils.randomInt(2, 5))
    });

    if(level) {
      createFolders(id, level - 1);
    }
  }
}
createFolders(null, levels);



