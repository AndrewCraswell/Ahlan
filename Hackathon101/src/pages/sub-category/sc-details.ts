import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { Category, Topic } from "../../model/appContent";

@Component({
  selector: 'sc-list',
  templateUrl: 'sc-details.html'
})
export class SubCategoryPage {
  icons: string[];
  itemRows: Array<Array<{title: string, icon: string, translation: string, topic: Topic}>>;
  selectedItem: any;
  category: Category;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.category = this.selectedItem.category;
    
    this.icons = ['cart',  'call', 'cart', 'bus', 'wine', 'car'];

    this.itemRows = [];

    let topics = this.category.topics;
    for(let i = 0; i < topics.length; i+=2) {
      var nextRow = new Array<{title: string, icon: string, translation: string, topic: Topic}>();
      nextRow.push({
          title: topics[i].title['en-US'],
          icon: this.icons[i],
          translation: topics[i].title['ar'],
          topic: topics[i]
        });
      if (i + 1 < topics.length) {
          nextRow.push({
          title: topics[i+1].title['en-US'],
          icon: this.icons[i+1],
          translation: topics[i+1].title['ar'],
          topic: topics[i+1]
        });
      }
      this.itemRows.push(nextRow);
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
