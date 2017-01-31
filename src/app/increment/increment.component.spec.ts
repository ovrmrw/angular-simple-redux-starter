/* tslint:disable:no-unused-variable */

import { TestBed, async, fakeAsync, tick, ComponentFixture, discardPeriodicTasks } from '@angular/core/testing'
import { IncrementComponent } from './increment.component'
import { ReactiveStore, LoopType } from 'ovrmrw-reactive-store'
import { AppState, ReactiveStoreService } from '../../state'


const initialState: AppState = {
  increment: {
    counter: 0,
  },
  lastUpdated: 0,
}


describe('IncrementComponent', () => {
  let fixture: ComponentFixture<IncrementComponent>
  let cp: IncrementComponent
  let el: any // Element
  let state: AppState


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
          {
            provide: ReactiveStoreService,
            useValue: new ReactiveStore(initialState, {
              output: true,
              loopType: LoopType.settimeout,
              testing: true
            })
          },
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


  // it('increment', async (done) => {
  //   cp.ngOnInit()
  //   cp.store.getter().subscribe({
  //     complete: async () => {
  //       fixture.detectChanges()
  //       expect(cp.counter).toBe(104)
  //       expect(cp.lastUpdated).not.toBe(0)
  //       await cp.store.forceResetForTesting()
  //       done()
  //     }
  //   })
  //   await cp.increment()
  //   cp.store.forceCompleteForTesting()
  // })
  it('increment', fakeAsync(() => {
    cp.increment()
    tick()
    fixture.detectChanges()
    expect(cp.counter).toBe(4)
    expect(cp.lastUpdated).not.toBe(0)
  }))


  // it('decrement', async (done) => {
  //   cp.ngOnInit()
  //   cp.store.getter().subscribe({
  //     complete: async () => {
  //       fixture.detectChanges()
  //       expect(cp.counter).toBe(96)
  //       expect(cp.lastUpdated).not.toBe(0)
  //       await cp.store.forceResetForTesting()
  //       done()
  //     }
  //   })
  //   await cp.decrement()
  //   cp.store.forceCompleteForTesting()
  // })
  it('decrement', fakeAsync(() => {
    cp.decrement()
    tick()
    fixture.detectChanges()
    expect(cp.counter).toBe(-4)
    expect(cp.lastUpdated).not.toBe(0)
  }))


  // it('reset', async (done) => {
  //   cp.ngOnInit()
  //   cp.store.getter().subscribe({
  //     complete: async () => {
  //       fixture.detectChanges()
  //       expect(cp.counter).toBe(0)
  //       expect(cp.lastUpdated).not.toBe(0)
  //       await cp.store.forceResetForTesting()
  //       done()
  //     }
  //   })
  //   await cp.increment()
  //   await cp.increment()
  //   await cp.reset()
  //   cp.store.forceCompleteForTesting()
  // })
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
