export const initialState = {
  increment: {
    value: 0,
  },
  lastUpdated: 0,
}


/* initialStateからtypeを生成する。 */
export type AppState = typeof initialState
export type IncrementState = Pick<AppState, 'increment'>


/* Component, Serviceでimportして使う文字列。 */
export const incrementKey = 'increment'
export const lastUpdatedKey = 'lastUpdated'


/* AppState keysと上記の文字列定義に差異がないかチェックする。 */
const __AppStateKeyValidation__: Array<keyof AppState> = [
  incrementKey,
  lastUpdatedKey,
]
