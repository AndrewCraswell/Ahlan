import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {  } from "../../model/appContent";
import { SubCategoryPage } from '../sub-category/sc-details';
import { ContentProvider } from '../../services/contentProvider';
import { Category } from "../../model/appContent";

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }
}
