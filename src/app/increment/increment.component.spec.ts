/* tslint:disable:no-unused-variable */

import { TestBed, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing'
import { Injectable, NgZone } from '@angular/core'
import { IncrementComponent } from './increment.component'
import { ReactiveStore, LoopType } from 'ovrmrw-reactive-store'
import { AppState, ReactiveStoreService } from '../../state'


const initialState: AppState = {
  increment: {
    counter: 0,
  },
  lastUpdated: 0,
}

@Injectable()
class MockReactiveStoreService extends ReactiveStore<AppState> {
  constructor(
    private zone: NgZone,
  ) {
    super(initialState, {
      concurrent: 1,
      output: true,
      loopType: LoopType.settimeout,
      ngZone: zone,
    })
  }
}


describe('IncrementComponent', () => {
  let fixture: ComponentFixture<IncrementComponent>
  let cp: IncrementComponent
  let el: any // Element


  beforeEach(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          IncrementComponent,
        ],
        providers: [
          { provide: ReactiveStoreService, useClass: MockReactiveStoreService },
        ]
      })
      .compileComponents()
    fixture = TestBed.createComponent(IncrementComponent)
    cp = fixture.debugElement.componentInstance
    el = fixture.debugElement.nativeElement
  })


  it('should create the app', fakeAsync(() => {
    expect(cp).toBeTruthy()
  }))


  it('should render title in a h1 tag', fakeAsync(() => {
    fixture.detectChanges()
    expect(el.querySelector('h1').textContent).toContain('0')
  }))


  it('increment', fakeAsync(() => {
    cp.increment()
    tick()
    fixture.detectChanges()
    expect(cp.counter).toBe(4)
    expect(cp.lastUpdated).not.toBe(0)
  }))


  it('decrement', fakeAsync(() => {
    cp.reset() // workaround
    tick()

    cp.decrement()
    tick()
    fixture.detectChanges()
    expect(cp.counter).toBe(-4)
    expect(cp.lastUpdated).not.toBe(0)
  }))


  it('reset', fakeAsync(() => {
    cp.increment()
    tick()
    cp.increment()
    tick()
    cp.reset()
    tick()
    fixture.detectChanges()
    expect(cp.counter).toBe(0)
    expect(cp.lastUpdated).not.toBe(0)
  }))
})
