import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { Topic } from "../../model/appContent";

@Component({
  selector: 'sc-list',
  templateUrl: 'sc-details.html'
})
export class SubCategoryPage {
  itemRows: Array<Array<{title: string, icon: string, translation: string, topic: Topic}>>;
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    let topics = this.selectedItem.category.topics;
    let numTopics = topics.length;
    this.itemRows = [];

    for(let i = 0; i < numTopics; i++) {
      var nextRow = new Array<{title: string, icon: string, translation: string, topic: Topic}>();
      var again = false;
      do {
        again = !again;
        nextRow.push({
            title: topics[i].title['ar'],
            icon: topics[i].icon != null ? topics[i].icon : "fa-info-circle",
            translation: topics[i].title['en-US'],
            topic: topics[i]
          });
      } while (again && ++i < numTopics)
      this.itemRows.push(nextRow);
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
