import { DatesToTonesPage } from './app.po';

describe('dates-to-tones App', () => {
  let page: DatesToTonesPage;

  beforeEach(() => {
    page = new DatesToTonesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
