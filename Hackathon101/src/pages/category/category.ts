import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { SubCategoryPage } from '../sub-category/sc-details';

@Component({
  selector: 'category-list',
  templateUrl: 'category.html'
})
export class CategoryPage {
  categories: string[];
  icons: string[];
  items: Array<{title: string, note: string, icon: string, color: string, translation: string}>;
  colors: string[];
  translations: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];
    this.categories = ['Basics', 'Learn English', 'Employment', 'Education', 'Services'];
    this.translations = ['أساسيات', 'تعلم الانجليزية', 'الوظيفة', 'التعليم', 'الخدمات']
    this.colors = [ '#008272', '#DA3B01','#FFB900','#5C2D9E','#0078D7'];

    this.items = [];
    for(let i = 0; i < this.categories.length; i++) {
      this.items.push({
        title: this.categories[i],
        note: '<category'+ i +' description>',
        icon: this.icons[Math.floor(Math.random() * this.icons.length)],
        color: this.colors[i],
        translation: this.translations[i]
      });
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(SubCategoryPage, {
      item: item
    });
  }
}
