import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getAppNavbarTitle() {
    return element(by.css('app-root app-navbar .navbar-brand')).getText();
  }
}
