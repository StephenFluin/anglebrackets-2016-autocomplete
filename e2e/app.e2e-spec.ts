import { AutocompletePage } from './app.po';

describe('autocomplete App', function() {
  let page: AutocompletePage;

  beforeEach(() => {
    page = new AutocompletePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
