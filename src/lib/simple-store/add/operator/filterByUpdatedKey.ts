import { Observable } from 'rxjs'

import { filterByUpdatedKey } from '../../operator/filterByUpdatedKey'


Observable.prototype.filterByUpdatedKey = filterByUpdatedKey


declare module 'rxjs/Observable' {
    interface Observable<T> {
        filterByUpdatedKey: typeof filterByUpdatedKey
    }
}
