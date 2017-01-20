import { Injectable, NgZone } from '@angular/core'
import { ReactiveStore, getObjectKeys, getReactiveStoreAsSingleton, LoopType } from 'ovrmrw-reactive-store'


export const initialState: AppState = {
  increment: {
    counter: 0,
  },
  lastUpdated: 0,
}


export const KEY = getObjectKeys(initialState)

export const storeInstance = getReactiveStoreAsSingleton(initialState, {
  concurrent: 1,
  output: true,
  loopType: LoopType.asap,
})


@Injectable()
export class ReactiveStoreService extends ReactiveStore<AppState> {
  constructor(
    private zone: NgZone,
  ) {
    super(initialState, {
      concurrent: 1,
      output: true,
      loopType: LoopType.asap,
      ngZone: zone,
    })
  }
}



export interface AppState {
  increment: IncrementState,
  lastUpdated: number,
}

export interface IncrementState {
  counter: number,
}
