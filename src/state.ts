import { ObjectKeys } from './lib/simple-store';


export const initialState: AppState = {
  increment: {
    counter: 0,
  },
  lastUpdated: 0,
}


/* AppStateの型定義。 */
export interface AppState {
  increment: IncrementState,
  lastUpdated: number,
}


/* AppStateのKeyからオブジェクトを生成。ComponentやServiceでImportしてsetState()の第一引数に使う。 */
export const KEY: ObjectKeys<AppState> = {
  increment: 'increment',
  lastUpdated: 'lastUpdated',
}


export interface IncrementState {
  counter: number,
}
