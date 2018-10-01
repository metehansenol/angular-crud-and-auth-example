import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display app navbar', () => {
    page.navigateTo();
    expect(page.getAppNavbarTitle()).toEqual('Webtrekk JS Developer Challenge');
  });
});
