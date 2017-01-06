import { OpaqueToken } from '@angular/core'
import { Observable, Subject } from 'rxjs'


export const StoreQueueConcurrent = new OpaqueToken('StoreQueueConcurrent')

export const StoreInitialState = new OpaqueToken('StoreInitialState')


export interface Action {
  key: string,
  value: any,
  subject: Subject<any>,
}


type Value<T, K extends keyof T> = T[K]
type ValueResolver<T, K extends keyof T> = (value: T[K]) => T[K]

export type ValueOrResolver<T, K extends keyof T> =
  Value<T, K> | ValueResolver<T, K> |
  Promise<Value<T, K>> | Promise<ValueResolver<T, K>> |
  Observable<Value<T, K>> | Observable<ValueResolver<T, K>>


export function typedObjectAssign<T, U extends Partial<T>>(state: T, partials: U[]): T {
  return partials.reduce((p, partial) => {
    return { ...<any>p, ...<any>partial }
  }, state)
}


export type ObjectKeys<T> = {
[P in keyof T]: P
}
