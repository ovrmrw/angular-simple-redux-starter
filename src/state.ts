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


/* Component, Serviceでimportして使う文字列(String Literal Type)。 */
export const incrementKey = 'increment' // String Literal Type
export const lastUpdatedKey = 'lastUpdated' // String Literal Type


/* AppState keysと上記の文字列定義に差異がないかチェックする。 */
const __AppStateKeyValidation__: Array<keyof AppState> = [
  incrementKey,
  lastUpdatedKey,
]


export interface IncrementState {
  counter: number,
}
