import { latestUpdatedProperty } from './simple-store';


export function updatedProperty<T>(this: string[], state: T): boolean {
  if (!Array.isArray(this)) { throw new Error('"this" object of "updatedProperty" function should be an array!'); }
  const keys: string[] = this;
  return keys.some(key => key === state[latestUpdatedProperty]);
}
