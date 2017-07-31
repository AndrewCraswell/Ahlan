import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
// import { SubCategoryPage } from '../sub-category/sc-details';
// import { ContentProvider } from '../../services/contentProvider';
import { Topic, Card } from "../../model/appContent";
// import { CardInfoTemplateOnly } from "../../model/appContent";
// import { CardInfoTemplateWithImg } from "../../model/appContent";
// import { CardDosDont } from "../../model/appContent";
// import { CardDosDontList } from "../../model/appContent";


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;
  topic: Topic;

  urls_left: string[];
  urls_right: string[];
  titles: string[];
  translations: string[];
  types: string[];
  items: Array<{title: string, translation: string, url_left: string, url_right: string, type:string}>;

  // Every Card has a title, translation, and template. Assigning the card to itemCard as well.
  itemCards: Array<{title: string, translation: string, template: string, card: Card, urls: string[], dostext: string[], donttext: string[], dosicons: string[], donticons: string[]}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    console.log('Navigated to Cards:: L2');
    console.log(this.selectedItem);

    let cards = this.selectedItem.topic.cards;

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
      switch(cards[i].template){
        case 'cardInfoTemplateOnly':
          this.itemCards.push({
            card: cards[i],
            template: cards[i].template,
            title: cards[i].title['en-US'],
            translation: cards[i].title['ar'],
            urls: [],
            dostext  : [],
            donttext : [],
            dosicons : [],
            donticons: []
          });
          break;
        case 'cardInfoTemplateWithImg':
          this.itemCards.push({
            card: cards[i],
            template: cards[i].template,
            title: cards[i].title['en-US'],
            translation: cards[i].title['ar'],
            urls: ["assets/img/template2.png"],
            // urls: [cards[i].mediaInfoWithImg],
            dostext  : [],
            donttext : [],
            dosicons : [],
            donticons: []
          });
          break;
        case 'cardDosDont':
          this.itemCards.push({
            card: cards[i],
            template: cards[i].template,
            title: cards[i].title['en-US'],
            translation: cards[i].title['ar'],
            urls: ["assets/img/kitchen1.png","assets/img/kitchen3.png"],
            // urls: cards[i].mediaDosDont,
            dostext  : [],
            donttext : [],
            dosicons : [],
            donticons: []
          });
          break;
        case 'cardDosDontList':
          this.itemCards.push({
            card: cards[i],
            template: cards[i].template,
            title: cards[i].title['en-US'],
            translation: cards[i].title['ar'],
            urls: ["assets/img/template2.png"],
            // urls: [cards[i].mainImageDosDontList],
            dostext  : cards[i].dosListText,
            donttext : cards[i].dontListText,
            dosicons : cards[i].dosListIcon,
            donticons: cards[i].dontListIcon
          });
          break;
      }
    }

    for(let i = 0; i < this.urls_left.length; i++) {
      this.items.push({
        title: this.titles[i],
        translation: this.translations[i],
        url_left: this.urls_left[i],
        url_right: this.urls_right[i],
        type: this.types[i]
      });
    }
  }
}
