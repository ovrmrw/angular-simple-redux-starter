import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { IncrementComponent } from './increment';

import { LibModule } from '../lib/lib.module';
import { InitialState } from '../lib/simple-store';
import { initialState } from '../state';


@NgModule({
  declarations: [
    AppComponent,
    IncrementComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LibModule,
  ],
  providers: [
    { provide: InitialState, useValue: initialState },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
