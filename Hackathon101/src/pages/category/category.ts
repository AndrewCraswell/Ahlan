import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { SubCategoryPage } from '../sub-category/sc-details';

@Component({
  selector: 'category-list',
  templateUrl: 'category.html'
})
export class CategoryPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Category ' + i,
        note: '<category'+ i +' description>',
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(SubCategoryPage, {
      item: item
    });
  }
}
