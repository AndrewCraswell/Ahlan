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

  categories: Category[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private contentProvider: ContentProvider) {
    this.items = [];

    console.log("Preparing category view.");
    this.contentProvider.loadAppContent().then(categories => {
      console.log("Looking for content in category view.");
      if (categories != null) {
        for(let i = 0; i < categories.length; i++) {
          this.items.push({
            title: categories[i].title['ar'],
            color: categories[i].color,
            translation: categories[i].title['en-US'],
            category: categories[i]
          })
        }
      }
    });
  }

  itemTapped(event, item) {
    this.navCtrl.push(SubCategoryPage, {
      item: item
    });
  }
}
