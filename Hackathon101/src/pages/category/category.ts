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
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    contentProvider.loadAppContent().then(categories => {

    for(let i = 0; i < categories.length; i++) {
      this.items.push({
        title: categories[i].title['en-US'],
        // note: '<category'+ i +' description>',
        // icon: this.icons[Math.floor(Math.random() * this.icons.length)],
        color: categories[i].color,
        translation: categories[i].title['ar'],
        category: categories[i]
      })
    }});
  }

  itemTapped(event, item) {
    this.navCtrl.push(SubCategoryPage, {
      item: item
    });
  }
}
