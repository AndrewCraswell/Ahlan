import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'sc-list',
  templateUrl: 'sc-details.html'
})
export class SubCategoryPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string, translation: string}>;
  items1: Array<{title: string, note: string, icon: string, translation: string}>;
  items2: Array<{title: string, note: string, icon: string, translation: string}>;
  selectedItem: any;
  categories: string[];
  translations: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    
    this.icons = ['cart', 'call', 'bus', 'wine', 'car', 'knife'];
    this.categories = ['Shopping','Emergency','Transportation','Food','Driving','Kitchen']
    this.translations = ['تسوق', 'طوارئ', 'تنقل', 'طعام', 'القيادة', 'المطبخ']

    this.items = [];
    this.items1 = [];
    this.items2 = [];
    for(let i = 0; i < this.icons.length; i++) {
      this.items.push({
        title: this.categories[i],
        note: '',
        icon: this.icons[i],
        translation: this.translations[i]
      });
      if(i%2==0){
        this.items1.push({
          title: this.categories[i],
          note: '',
          icon: this.icons[i],
          translation: this.translations[i]
        });
      }
      else {
        this.items2.push({
          title: this.categories[i],
          note: '',
          icon: this.icons[i],
          translation: this.translations[i]
        });
      }
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
