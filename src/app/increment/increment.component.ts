import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core'
import { Observable } from 'rxjs/Rx'

import { Disposer } from '../../lib/class'
import { ReactiveStoreService, IncrementState, AppState, KEY } from '../../state'


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
  counter: number
  lastUpdated: number


  constructor(
    public store: ReactiveStoreService,
    private cd: ChangeDetectorRef,
  ) {
    super()
  }


  ngOnInit() {
    this.initState()
  }


  private initState(): void {
    this.disposable = this.store.getter()
      .filterByUpdatedKey(KEY.increment, KEY.lastUpdated)
      .subscribe(state => {
        console.log('filterd state:', state)
        this.counter = state.increment.counter
        this.lastUpdated = state.lastUpdated
        this.cd.markForCheck()
      })
  }


  ngOnDestroy() {
    this.disposeSubscriptions()
  }


  increment(): Promise<any> {
    return this.store.setter(KEY.increment, (p) => ({ counter: p.counter + 1 }))
      .then(() => this.store.setter(KEY.increment, incrementCallback))
      .then(() => this.store.setter(KEY.increment, (_, a) => Promise.resolve({ counter: a.increment.counter + 1 })))
      .then(() => this.store.setter(KEY.increment, Observable.of(incrementCallback)))
      .then(() => this.store.setter(KEY.lastUpdated, new Date().getTime()))
  }


  decrement(): Promise<any> {
    return this.store.setter(KEY.increment, (p) => ({ counter: p.counter - 1 }))
      .then(() => this.store.setter(KEY.increment, decrementCallback))
      .then(() => this.store.setter(KEY.increment, (_, a) => Promise.resolve({ counter: a.increment.counter - 1 })))
      .then(() => this.store.setter(KEY.increment, Observable.of(decrementCallback)))
      .then(() => this.store.setter(KEY.lastUpdated, new Date().getTime()))
  }


  reset(): Promise<any> {
    return this.store.setter(KEY.increment, { counter: this.store.initialState.increment.counter })
  }

}



function incrementCallback(state: IncrementState): IncrementState {
  return { counter: state.counter + 1 }
}


function decrementCallback(state: IncrementState): IncrementState {
  return { counter: state.counter - 1 }
}
