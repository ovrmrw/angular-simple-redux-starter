import { Injectable, NgZone } from '@angular/core'
import { ReactiveStore, getObjectKeys } from 'ovrmrw-reactive-store'


export const initialState: AppState = {
  increment: {
    counter: 0,
  },
  lastUpdated: 0,
}


export const KEY = getObjectKeys(initialState)


@Injectable()
export class ReactiveStoreService extends ReactiveStore<AppState> {
  constructor(
    private zone: NgZone,
  ) {
    super(initialState, {
      concurrent: Number.POSITIVE_INFINITY,
      output: true,
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
