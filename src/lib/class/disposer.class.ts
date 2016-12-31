import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';


export abstract class Disposer {
  private subs: Subscription[] = [];


  constructor() { }


  set disposable(sub: Subscription) {
    this.subs.push(sub);
  }


  disposeSubscriptions(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
