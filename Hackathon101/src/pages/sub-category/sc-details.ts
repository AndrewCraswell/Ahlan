import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'sc-list',
  templateUrl: 'sc-details.html'
})
export class SubCategoryPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  items1: Array<{title: string, note: string, icon: string}>;
  items2: Array<{title: string, note: string, icon: string}>;
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    this.items1 = [];
    this.items2 = [];
    for(let i = 1; i < this.icons.length; i++) {
      this.items.push({
        title: 'Sub-Category ' + i,
        note: '',
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
      if(i%2==0){
        this.items1.push({
          title: 'Sub-Category ' + i,
          note: '',
          icon: this.icons[Math.floor(Math.random() * this.icons.length)]
        });
      }
      else {
        this.items2.push({
          title: 'Sub-Category ' + i,
          note: '',
          icon: this.icons[Math.floor(Math.random() * this.icons.length)]
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
