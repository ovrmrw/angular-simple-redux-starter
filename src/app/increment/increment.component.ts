import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core'
import { Observable } from 'rxjs'

import { Disposer } from '../../lib/class'
import { SimpleStore } from '../../lib/simple-store'
import { AppState, IncrementState } from '../../state'
import { incrementKey, lastUpdatedKey } from '../../state'


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
    private store: SimpleStore<AppState>,
    private cd: ChangeDetectorRef,
  ) {
    super()
  }


  ngOnInit() {
    this.initGetState() // ngOnInitの中をfatにしたくないので用途毎に切り出す。
  }


  private initGetState(): void {
    this.disposable = this.store.getState()
      .filterByUpdatedKey(incrementKey, lastUpdatedKey) // 指定したkeyが更新されたときだけ通過させることができる。
      .subscribe(state => {
        console.log('filterd state:', state)
        this.counter = state.increment.value
        this.lastUpdated = state.lastUpdated
        this.cd.markForCheck()
      })
  }


  ngOnDestroy() {
    this.disposeSubscriptions()
  }


  // setState()の第一引数に応じて第二引数に型が適用される。(TypeScript 2.1のkeyofが使われている)
  // 第二引数は直接値を代入しても良いしコールバックを代入しても良い。
  // 直接値を代入した場合はStateを上書きする。
  // コールバックは既存のStateを更新するために用いる。
  // setState()の戻り値はPromise<AppState>なので更新後のStateを使ってチェーンできる。
  increment(): void {
    this.store.setState(incrementKey, (p) => ({ value: p.value + 1 })) // コールバック
      .then(state => this.store.setState(incrementKey, incrementCallback)) // 外部で定義したコールバック
      .then(state => this.store.setState(incrementKey, Promise.resolve({ value: state.increment.value + 1 }))) // 非同期で直接値
      .then(state => this.store.setState(incrementKey, Observable.of(incrementCallback))) // 非同期で外部のコールバック
      .then(state => this.store.setState(lastUpdatedKey, new Date().getTime())) // 直接値
  }


  decrement(): void {
    this.store.setState(incrementKey, (p) => ({ value: p.value - 1 }))
      .then(state => this.store.setState(incrementKey, decrementCallback))
      .then(state => this.store.setState(incrementKey, Promise.resolve({ value: state.increment.value - 1 })))
      .then(state => this.store.setState(incrementKey, Observable.of(decrementCallback)))
      .then(state => this.store.setState(lastUpdatedKey, new Date().getTime()))
  }


  reset(): void {
    this.store.setState(incrementKey, { value: 0 })
  }

}



function incrementCallback(state: IncrementState): IncrementState {
  return { value: state.value + 1 }
}


function decrementCallback(state: IncrementState): IncrementState {
  return { value: state.value - 1 }
}
