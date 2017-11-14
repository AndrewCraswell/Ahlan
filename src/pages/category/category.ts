import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { SubCategoryPage } from '../sub-category/sc-details';

import { ContentProvider } from '../../services/contentProvider';
import { Category } from "../../model/appContent";

@Component({
  selector: 'category-list',
  templateUrl: 'category.html',
  providers: [ContentProvider]
})
export class CategoryPage {
  tempCategories: string[];
  icons: string[];
  items: Array<{title: string, /*note: string, icon: string,*/ color: string, translation: string, category: Category}>;
  colors: string[];
  translations: string[];

  cloudUpdated: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private contentProvider: ContentProvider) {
    this.items = [];
    this.cloudUpdated = false;

    console.log("Preparing category view.");
    this.contentProvider.getLocalContent().then(categories => {
      console.log("Got local content in category view.");
      // Make sure the call to refreshContent below didn't finish before we get here
      if (!this.cloudUpdated) {
        this.assignContent(categories);
      }
      else {
        console.log("NOT finishing update from local cache - already applied latest update from cloud.");
      }
    });

    this.refreshContent();

  }

  refreshContent(refresher = null) {
    this.contentProvider.getUpdatedContent().then(categories => {
      console.log("Got new content in category view.");
      this.items = [];
      this.assignContent(categories);
      this.cloudUpdated = true;
      if (refresher != null) {
        refresher.complete();
      }
    });
  }

  assignContent(categories: Category[]) {
    if (categories != null) {
      console.log("Adding updated content to view.");
      for(let i = 0; i < categories.length; i++) {
        this.items.push({
          title: categories[i].title['ar'],
          color: categories[i].color,
          translation: categories[i].title['en-US'],
          category: categories[i]
        })
      }
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(SubCategoryPage, {
      item: item
    });
  }
}
