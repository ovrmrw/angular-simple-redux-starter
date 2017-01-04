import { Injectable, NgZone, Inject, Optional } from '@angular/core'
import { Observable, Subject, BehaviorSubject } from 'rxjs'

import { StoreQueueConcurrent, StoreInitialState, Action, ValueOrResolver } from './common'

import './add/operator/all'

export const latestUpdatedKey = '__latest__'


@Injectable()
export class SimpleStore<T> {
  private simpleStore$ = new Subject<Action>()
  private provider$: BehaviorSubject<T | RecursiveReadonly<T>>


  constructor(
    private zone: NgZone,
    @Inject(StoreInitialState) @Optional()
    private initialState: T | null,
    @Inject(StoreQueueConcurrent) @Optional()
    private concurrent: number | null,
  ) {
    this.provider$ = new BehaviorSubject<T>(initialState || {} as T)
    this.createStore()
    this.applyEffectors()
  }


  private createStore(): void {
    const queue$ =
      this.simpleStore$
        .mergeMap(action => {
          if (action.value instanceof Promise || action.value instanceof Observable) {
            return Observable.from(action.value)
              .mergeMap(value => Observable.of(Object.assign(action, { value })))
          } else {
            return Observable.of(action)
          }
        }, (this.concurrent || 1))

    const reduced$ =
      queue$
        .scan((state, action) => {
          if (action.value instanceof Function) {
            state[action.key] = action.value.call(null, state[action.key])
          } else {
            state[action.key] = action.value
          }
          state[latestUpdatedKey] = action.key
          const newState = Object.assign({}, state)
          setTimeout(() => {
            action.subject.next(newState)
          }, 0)
          return newState
        }, this.initialState as T)

    reduced$
      .subscribe(newState => {
        console.log('newState:', newState)
        this.zone.run(() => {
          this.provider$.next(newState)
        })
        this.effectAfterReduced(newState)
      })
  }


  private effectAfterReduced(state: T): void {

  }


  private applyEffectors(): void {

  }


  setState<K extends keyof T>(key: K, value: ValueOrResolver<T, K>): Promise<T> { // TをRecursiveReadonly<T>にするとプロパティ名の一斉リネームが出来なくなる。
    const subject = new Subject<T | RecursiveReadonly<T>>()
    this.simpleStore$.next({ key, value, subject })
    return subject.take(1).toPromise()
  }


  getState(): Observable<T> { // TをRecursiveReadonly<T>にするとプロパティ名の一斉リネームが出来なくなる。
    return this.provider$
  }


  getStateAsPromise(): Promise<T> { // TをRecursiveReadonly<T>にするとプロパティ名の一斉リネームが出来なくなる。
    return this.provider$.take(1).toPromise()
  }

}



type RecursiveReadonly<T> = {
  readonly[P in keyof T]: RecursiveReadonly<T[P]>
}
