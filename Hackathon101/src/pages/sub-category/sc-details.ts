import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'sc-list',
  templateUrl: 'sc-details.html'
})
export class SubCategoryPage {
  icons: string[];
  itemRows: Array<Array<{title: string, note: string, icon: string, translation: string}>>;
  selectedItem: any;
  categories: string[];
  translations: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    
    this.icons = ['cart',  'call', 'cart', 'bus', 'wine', 'car'];
    this.categories = ['Kitchen', 'Emergency','Shopping', 'Transportation','Food','Driving']
    this.translations = [ 'المطبخ', 'طوارئ', 'تسوق', 'تنقل', 'طعام', 'القيادة']

    this.itemRows = [];

    for(let i = 0; i < this.icons.length - 1; i+=2) {
      this.itemRows.push([{
        title: this.categories[i],
        note: '',
        icon: this.icons[i],
        translation: this.translations[i]
      },
      {
        title: this.categories[i+1],
        note: '',
        icon: this.icons[i+1],
        translation: this.translations[i+1]
      }]);
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
