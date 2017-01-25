/* tslint:disable:no-unused-variable */

import { TestBed, async, fakeAsync, tick, ComponentFixture, discardPeriodicTasks } from '@angular/core/testing'
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
      // loopType: LoopType.asap,
      // ngZone: zone,
      testing: true,
    })
  }
}


describe('IncrementComponent', () => {
  let fixture: ComponentFixture<IncrementComponent>
  let cp: IncrementComponent
  let el: any // Element


  beforeEach(() => {
    jasmine.addMatchers({
      toHaveText: function () {
        return {
          compare: function (actual, expectedText) {
            let actualText = actual.textContent
            return {
              pass: actualText === expectedText,
              get message() { return 'Expected ' + actualText + ' to equal ' + expectedText }
            }
          }
        }
      },

      toContainText: function () {
        return {
          compare: function (actual, expectedText) {
            let actualText = actual.textContent
            return {
              pass: actualText.indexOf(expectedText) > -1,
              get message() { return 'Expected ' + actualText + ' to contain ' + expectedText }
            }
          }
        }
      }
    })
  })


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
    cp = fixture.componentInstance
    el = fixture.debugElement.nativeElement
  })


  it('should create the app', fakeAsync(() => {
    expect(cp).toBeTruthy()
  }))


  it('should render title in a h1 tag', fakeAsync(() => {
    fixture.detectChanges()
    expect(el.querySelector('h1')).toHaveText('0')
  }))


  it('increment', (done) => {
    let state: AppState
    cp.store.forceResetForTesting().then(() => {
      cp.store.getter().subscribe({
        next: s => {
          state = s
          console.log('counter:', state.increment.counter)
        },
        complete: () => {
          expect(state.increment.counter).toBe(4)
          expect(state.lastUpdated).not.toBe(0)
          done()
        }
      })

      cp.increment()
        .then(() => {
          cp.store.forceCompleteForTesting()
        })
    })
  })


  it('decrement', (done) => {
    let state: AppState
    cp.store.forceResetForTesting().then(() => {
      cp.store.getter().subscribe({
        next: s => {
          state = s
          console.log('counter:', state.increment.counter)
        },
        complete: () => {
          expect(state.increment.counter).toBe(-4)
          expect(state.lastUpdated).not.toBe(0)
          done()
        }
      })

      cp.decrement()
        .then(() => {
          cp.store.forceCompleteForTesting()
        })
    })
  })


  it('reset', (done) => {
    let state: AppState
    cp.store.forceResetForTesting().then(() => {
      cp.store.getter().subscribe({
        next: s => {
          state = s
          console.log('counter:', state.increment.counter)
        },
        complete: () => {
          expect(state.increment.counter).toBe(0)
          expect(state.lastUpdated).not.toBe(0)
          done()
        }
      })

      cp.increment()
        .then(() => cp.increment())
        .then(() => cp.reset())
        .then(() => {
          cp.store.forceCompleteForTesting()
        })
    })
  })

})
