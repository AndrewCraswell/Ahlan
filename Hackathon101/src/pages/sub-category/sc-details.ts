import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { Article } from "../../model/appContent";

@Component({
  selector: 'sc-list',
  templateUrl: 'sc-details.html'
})
export class SubCategoryPage {
  icons: string[];
  itemRows: Array<Array<{title: string, note: string, icon: string, translation: string, article: Article}>>;
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    
    this.icons = ['cart',  'call', 'cart', 'bus', 'wine', 'car'];

    this.itemRows = [];

    let articles = this.selectedItem.category.articles;
    for(let i = 0; i < articles.length; i+=2) {
      var nextRow = new Array<{title: string, note: string, icon: string, translation: string, article: Article}>();
      nextRow.push({
          title: articles[i].title['en-US'],
          note: '',
          icon: this.icons[i],
          translation: articles[i].title['ar'],
          article: articles[i]
        });
      if (i + 1 < articles.length) {
          nextRow.push({
          title: articles[i+1].title['en-US'],
          note: '',
          icon: this.icons[i+1],
          translation: articles[i+1].title['ar'],
          article: articles[i+1]
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
