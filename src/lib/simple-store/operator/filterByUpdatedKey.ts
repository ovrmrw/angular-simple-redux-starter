import { Observable, Subscriber, Operator } from 'rxjs'

import { latestUpdatedKey } from '../simple-store'


export function filterByUpdatedKey<T>(this: Observable<T>, ...keys: string[]): Observable<T> {
  return this.lift(new FilterByUpdatedKeyOperator(keys))
}


class FilterByUpdatedKeyOperator<T> implements Operator<T, T> {
  constructor(private keys: string[]) { }

  call(subscriber: Subscriber<T>, source: any): any {
    return source.subscribe(new FilterByUpdatedKeySubscriber(subscriber, this.keys))
  }
}


/**
 * 指定したkeyがvalue[latestUpdatedKey]に一致するか、value[latestUpdatedKey])が存在しないときにtrueを返す。
 */
class FilterByUpdatedKeySubscriber<T> extends Subscriber<T> {
  constructor(destination: Subscriber<T>, private keys: string[]) {
    super(destination)
  }

  protected _next(value: T) {
    let result: boolean
    try {
      result = this.keys.some(key => key === value[latestUpdatedKey]) || !value[latestUpdatedKey]
    } catch (err) {
      if (this.destination.error) {
        this.destination.error(err)
      }
      return
    }

    if (result) {
      if (this.destination.next) {
        this.destination.next(value)
      }
    }
  }
}
