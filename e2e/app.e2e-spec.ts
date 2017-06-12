import { CarelineFrontEndPage } from './app.po';

describe('careline-front-end App', function() {
  let page: CarelineFrontEndPage;

  beforeEach(() => {
    page = new CarelineFrontEndPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
