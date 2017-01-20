import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component'
import { IncrementComponent } from './increment'

import { ReactiveStoreService, storeInstance } from '../state'


@NgModule({
  declarations: [
    AppComponent,
    IncrementComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [
    // { provide: ReactiveStoreService, useValue: storeInstance },
    ReactiveStoreService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
