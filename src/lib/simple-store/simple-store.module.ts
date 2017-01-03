import { NgModule } from '@angular/core'

import { SimpleStore } from './simple-store'


@NgModule({
  providers: [
    SimpleStore,
  ]
})
export class SimpleStoreModule { }
