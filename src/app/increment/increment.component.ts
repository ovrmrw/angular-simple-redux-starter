import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { Disposer } from '../../lib/class';
import { SimpleStore, updatedProperty } from '../../lib/simple-store';
import { AppState, IncrementState } from '../../state';
import { increment, lastUpdated } from '../../state';


@Component({
  selector: 'app-increment',
  template: `  
    <h1>{{counter}}</h1>
    <button (click)="increment()">increment</button>
    <button (click)="decrement()">decrement</button>
    <button (click)="reset()">reset</button>
    <div>lastUpdated: {{lastUpdated}}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncrementComponent extends Disposer implements OnInit, OnDestroy {
  counter: number;
  lastUpdated: number;


  constructor(
    private store: SimpleStore<AppState>,
    private cd: ChangeDetectorRef,
  ) {
    super();
  }


  ngOnInit() {
    this.disposable = this.store.getState()
      .debounceTime(1)
      .subscribe(state => {
        this.counter = state.increment.value;
        this.lastUpdated = state.lastUpdated;
        this.cd.markForCheck();
      });
  }


  ngOnDestroy() {
    this.disposeSubscriptions();
  }


  increment(): void {
    this.store.setState(increment, (p) => ({ value: p.value + 1 }))
      .then(state => this.store.setState(increment, Promise.resolve({ value: state.increment.value + 1 })))
      .then(state => this.store.setState(increment, Observable.of({ value: state.increment.value + 1 })))
      .then(() => this.store.setState(lastUpdated, new Date().getTime()));
  }


  decrement(): void {
    this.store.setState(increment, (p) => ({ value: p.value - 1 }))
      .then(state => this.store.setState(increment, Promise.resolve({ value: state.increment.value - 1 })))
      .then(state => this.store.setState(increment, Observable.of({ value: state.increment.value - 1 })))
      .then(() => this.store.setState(lastUpdated, new Date().getTime()));
  }


  reset(): void {
    this.store.setState(increment, { value: 0 });
  }

}
