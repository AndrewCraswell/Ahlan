import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import * as Content from "../../model/appContent";
import { Platform } from 'ionic-angular/platform/platform';


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;
  topic: Content.Topic;

  urls_left: string[];
  urls_right: string[];
  titles: string[];
  translations: string[];
  types: string[];
  items: Array<{title: string, translation: string, url_left: string, url_right: string, type:string}>;

  // Every Card has a title, translation, and template. Assigning the card to itemCard as well.
  itemCards: Array<{title: string, translation: string, template: string, card: Content.Card}>;

  useLocalImages: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    console.log('Navigated to Cards:: L2');
    console.log(this.selectedItem);

    this.useLocalImages = platform.is('cordova');

    let cards: Content.Card[] = this.selectedItem.topic.cards;

    console.log("Trying to see what cards is: ")
    console.log(this.selectedItem.topic.cards);

    this.types = ["CardDosDont","CardInfoTmpWithImg"]
    this.urls_left = ["assets/img/kitchen1.png","assets/img/kitchen3.png"];
    this.urls_right= ["assets/img/kitchen2.png","assets/img/kitchen4.png"];
    this.titles = ["Use only dishwasher detergent. Don't use dish soap.","No floor drains in the kitchen & bathroom. Don't pour wateron the floor. Mop to clean floors."]
    this.translations = ["استعمل مسحوق الصابون الخاص بجلاية الصحون. لا تستعمل صابون الجلي","ا يوجد مصارف في أرضية المطبخ. لا يجب صب ماء علي الارض في داخل البيت للتنظيف"]

    this.items = [];
    this.itemCards = [];

    for(let i = 0; i < cards.length; i++) {
      // console.log("Check template:")
      // console.log(cards[i].template)
      this.itemCards.push({
        card: cards[i],
        template: cards[i].constructor.name,
        title: cards[i].title['en-US'],
        translation: cards[i].title['ar']
      });
    }
    
  }
}
