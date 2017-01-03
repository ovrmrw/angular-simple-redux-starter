export const initialState: AppState = {
  increment: {
    value: 0,
  },
  lastUpdated: 0,
};


/* AppStateの型定義。 */
export type AppState = {
  increment: IncrementState,
  lastUpdated: number,
};


/* Component, Serviceでimportして使う文字列。 */
export const incrementKey = 'increment';
export const lastUpdatedKey = 'lastUpdated';


/* AppState keysと上記の文字列定義に差異がないかチェックする。 */
const __AppStateKeyValidation__: (keyof AppState)[] = [
  incrementKey,
  lastUpdatedKey,
];


export interface IncrementState {
  value: number;
}
