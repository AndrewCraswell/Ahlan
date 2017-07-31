import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
//import { SubCategoryPage } from '../sub-category/sc-details';
//import { ContentProvider } from '../../services/contentProvider';
import { Topic } from "../../model/appContent";

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  topic: Topic;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.topic = navParams.get('topic');
  }
}
