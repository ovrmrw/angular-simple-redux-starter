import { latestUpdatedKey } from './simple-store'


/**
 * Deprecated. Use filterByUpdatedKey operator of RxJS.
 */
export function isUpdatedKey<T>(this: string[], state: T): boolean {
  if (!Array.isArray(this)) {
    throw new Error('"this" object of "updatedProperty" function should be an array!')
  }
  const keys: string[] = this
  return keys.some(key => key === state[latestUpdatedKey])
}
