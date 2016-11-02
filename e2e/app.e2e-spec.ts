import { PropertyCross2Page } from './app.po';

describe('property-cross2 App', function() {
  let page: PropertyCross2Page;

  beforeEach(() => {
    page = new PropertyCross2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
