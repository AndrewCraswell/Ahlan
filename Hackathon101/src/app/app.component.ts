import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { CategoryPage } from '../pages/category/category';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ContentUpdater } from '../services/contentUpdater';
import { ContentProvider } from '../services/contentProvider';
import { Storage } from '@ionic/storage';

//import { Category, Article, Card } from "../dataTypes/appContent";

@Component({
  templateUrl: 'app.html',
  providers: [ContentUpdater, ContentProvider]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //public categories: Category[];

  // make HelloIonicPage the root (or first) page
  rootPage = CategoryPage;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storage: Storage,
    private contentUpdater: ContentUpdater,
    private contentProvider: ContentProvider
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.contentUpdater.refreshContent();
      this.contentProvider.loadAppContent().then(() => {});
      //this.loadAppContent();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
  
  // loadAppContent() {
  //   this.storage.get('content').then(content => {
  //     var tempArts: Article[];
  //     var tempCards: Card[];
  //     content.items.array.forEach(element => {
  //       let type = element.sys.contentType.sys.id;
  //       let fields = element.fields;
  //       if (type == 'category') {
  //         var cat = new Category();
  //         cat.id = element.sys.id;
  //         cat.slug = fields.categorySlug;
  //         cat.title = fields.title;
  //         cat.color = fields.color['en-US'];
  //         this.categories.push(cat);
  //       }
  //       else if (type == 'article') {
  //         var art = new Article();
  //         art.id = element.sys.id;
  //         art.slug = fields.categorySlug;
  //         art.title = fields.title;
  //         tempArts.push(art);
  //       }
  //       else if (type == 'cardInfoTemplateOnly') {
  //         var c = new Card();
  //         c.id = element.sys.id;
  //         c.slug = fields.categorySlug;
  //         c.title = fields.title;
  //         tempCards.push(c);
  //       }
  //     });
      
  //   });
  // }
}
