import { Injectable, NgZone, Inject, Optional } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { QueueConcurrent, InitialState, Action, ValueTypes } from './common';


export const latestUpdatedProperty = '_latestUpdatedProperty';


@Injectable()
export class SimpleStore<T> {
  private simpleStore$ = new Subject<Action>();
  private provider$: BehaviorSubject<T>;


  constructor(
    private zone: NgZone,
    @Inject(InitialState) @Optional()
    private initialState: T | null,
    @Inject(QueueConcurrent) @Optional()
    private concurrent: number | null,
  ) {
    this.provider$ = new BehaviorSubject<T>(initialState || {} as T);
    this.createStore();
    this.applyEffectors();
  }


  private createStore(): void {
    const queue =
      this.simpleStore$
        .mergeMap(action => {
          if (action.value instanceof Promise || action.value instanceof Observable) {
            return Observable.from(action.value)
              .mergeMap(value => Observable.of(Object.assign(action, { value })));
          } else {
            return Observable.of(action);
          }
        }, (this.concurrent || 1));

    queue
      .scan((state, action) => {
        if (action.value instanceof Function) {
          state[action.key] = action.value.call(null, state[action.key]);
        } else {
          state[action.key] = action.value;
        }
        state[latestUpdatedProperty] = action.key;
        const newState = Object.assign({}, state);
        setTimeout(() => {
          action.subject.next(newState);
        }, 0);
        return newState;
      }, this.initialState as T)
      .subscribe(newState => {
        console.log('newState:', newState);
        this.zone.run(() => {
          this.provider$.next(newState);
        });
        this.effectAfterReduced(newState);
      });
  }


  private effectAfterReduced(state: T): void {

  }


  private applyEffectors(): void {

  }


  setState<K extends keyof T>(key: K, value: ValueTypes<T, K>): Promise<T> {
    const subject = new Subject<T>();
    this.simpleStore$.next({ key, value, subject });
    return subject.take(1).toPromise();
  }


  getState(): Observable<T> {
    return this.provider$;
  }

}
