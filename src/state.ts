export const initialState: AppState = {
  increment: {
    value: 0,
  },
  lastUpdated: 0,
};


/* AppStateの型定義。 */
export type AppState = {
  increment: IncrementState;
  lastUpdated: number;
};


/* Component, Serviceでimportして使う文字列。 */
export const increment = 'increment';
export const lastUpdated = 'lastUpdated';


/* AppState typesと上記の文字列定義に差異がないかチェックする。 */
const __AppStateTypeValidation__: (keyof AppState)[] = [
  increment,
  lastUpdated,
];


export interface IncrementState {
  value: number;
}
