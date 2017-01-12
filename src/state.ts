import { ObjectKey } from './lib/simple-store';


export const initialState: AppState = {
  increment: {
    counter: 0,
  },
  lastUpdated: 0,
}


/* 
  AppStateの型定義。 
  Keyを変更するときは KEY: ObjectKeys<AppState> の中身を変更してからこっちを変更すること。(for VSCode 1.8.1)
*/
export interface AppState {
  increment: IncrementState,
  lastUpdated: number,
}


/* initialStateのkeyからオブジェクトを生成。ComponentやServiceでimportしてsetState()の第一引数に使う。 */
// export const KEY = getObjectKeys(initialState)
export const incrementKey: ObjectKey<AppState, 'increment'> = 'increment'
export const lastUpdatedKey: ObjectKey<AppState, 'lastUpdated'> = 'lastUpdated'


export interface IncrementState {
  counter: number,
}
