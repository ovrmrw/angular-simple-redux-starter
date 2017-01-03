/* tslint:disable:no-unused-variable */

import { TestBed, async, fakeAsync, tick } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { IncrementComponent } from './increment'
import { LibModule } from '../lib/lib.module'
import { StoreInitialState } from '../lib/simple-store'
import { AppState } from '../state'

const initialState: AppState = {
  increment: {
    value: 0,
  },
  lastUpdated: 0,
}


describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        IncrementComponent,
      ],
      imports: [
        LibModule,
      ],
      providers: [
        { provide: StoreInitialState, useValue: initialState },
      ]
    })
    TestBed.compileComponents()
  })


  it('should create the app', fakeAsync(() => {
    let fixture = TestBed.createComponent(AppComponent)
    let app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  }))


  it(`should have as title 'app works!'`, fakeAsync(() => {
    let fixture = TestBed.createComponent(AppComponent)
    let app = fixture.debugElement.componentInstance
    expect(app.title).toEqual('app works!')
  }))


  it('should render title in a h1 tag', fakeAsync(() => {
    let fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    let compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector('h1').textContent).toContain('app works!')
  }))
})
