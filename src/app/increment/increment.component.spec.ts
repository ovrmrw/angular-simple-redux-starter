/* tslint:disable:no-unused-variable */

import { TestBed, async, fakeAsync, tick } from '@angular/core/testing'
import { IncrementComponent } from './increment.component'
import { ReactiveStoreService, storeInstance, AppState } from '../../state'

const initialState: AppState = {
  increment: {
    counter: 0,
  },
  lastUpdated: 0,
}


describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        IncrementComponent,
      ],
      providers: [
        { provide: ReactiveStoreService, useValue: storeInstance },
      ]
    })
    TestBed.compileComponents()
  })


  it('should create the app', fakeAsync(() => {
    const fixture = TestBed.createComponent(IncrementComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  }))


  it('should render title in a h1 tag', fakeAsync(() => {
    const fixture = TestBed.createComponent(IncrementComponent)
    fixture.detectChanges()
    const element = fixture.debugElement.nativeElement
    expect(element.querySelector('h1').textContent).toContain('0')
  }))


  it('increment', fakeAsync(() => {
    const fixture = TestBed.createComponent(IncrementComponent)
    const comp = fixture.componentInstance
    comp.increment()
    tick() // counter => 4
    fixture.detectChanges()
    expect(comp.counter).toBe(4)
    expect(comp.lastUpdated).not.toBe(0)
  }))


  it('decrement', fakeAsync(() => {
    const fixture = TestBed.createComponent(IncrementComponent)
    const comp = fixture.componentInstance
    comp.decrement()
    tick() // counter => -4
    fixture.detectChanges()
    expect(comp.counter).toBe(-4)
    expect(comp.lastUpdated).not.toBe(0)
  }))


  it('reset', fakeAsync(() => {
    const fixture = TestBed.createComponent(IncrementComponent)
    const comp = fixture.componentInstance
    comp.increment()
    tick() // counter => 4
    comp.increment()
    tick() // counter => 8
    comp.reset()
    tick() // counter => 0
    fixture.detectChanges()
    expect(comp.counter).toBe(0)
    expect(comp.lastUpdated).not.toBe(0)
  }))
})
