export function replaceAction<T>(value: T): (state: T) => T {
  return (state) => value
}


export function pushArrayAction<T>(value: T): (state: T[]) => T[] {
  return (state) => [...state, value]
}


export function switchAction(value: boolean): (state: boolean) => boolean {
  return (state) => !value
}


export function incrementAction(value: number = 1): (state: number) => number {
  return (state) => state + value
}
