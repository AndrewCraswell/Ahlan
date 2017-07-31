import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { CategoryPage } from '../pages/category/category';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ContentUpdater } from '../services/contentUpdater';
import { ContentProvider } from '../services/contentProvider';

@Component({
  templateUrl: 'app.html',
  providers: [ContentUpdater, ContentProvider]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = CategoryPage;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private contentUpdater: ContentUpdater,
    private contentProvider: ContentProvider
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.contentUpdater.refreshContent().then(() =>
      this.contentProvider.loadAppContent().then(() =>

        this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          this.statusBar.styleDefault();
          this.splashScreen.hide();
        })
      )
    );
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
