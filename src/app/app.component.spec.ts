/* tslint:disable:no-unused-variable */

import { TestBed, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { AppComponent } from './app.component'


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let cp: AppComponent
  let el: any // Element


  beforeEach(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          AppComponent,
        ],
        schemas: [
          NO_ERRORS_SCHEMA,
        ]
      })
      .compileComponents()
    fixture = TestBed.createComponent(AppComponent)
    cp = fixture.debugElement.componentInstance
    el = fixture.debugElement.nativeElement
  })


  it('should create the app', fakeAsync(() => {
    expect(cp).toBeTruthy()
  }))


  it(`should have as title 'app works!'`, fakeAsync(() => {
    expect(cp.title).toEqual('app works!')
  }))


  it('should render title in a h1 tag', fakeAsync(() => {
    fixture.detectChanges()
    expect(el.querySelector('h1').textContent).toContain('app works!')
  }))

})
