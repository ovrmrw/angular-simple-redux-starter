import { AngularSimpleReduxExamplePage } from './app.po';

describe('angular-simple-redux-example App', function() {
  let page: AngularSimpleReduxExamplePage;

  beforeEach(() => {
    page = new AngularSimpleReduxExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
