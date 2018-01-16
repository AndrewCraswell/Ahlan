import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import * as Content from "../../model/appContent";
import { Platform } from 'ionic-angular/platform/platform';


@Component({
  selector: 'topic',
  templateUrl: 'topic.html'
})
export class TopicPage {
  selectedTopic: any;
  topic: Content.Topic;
  articles: Array<{title: string, translation: string, template: string, card: Content.Card}>;
  useLocalImages: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform) {
    // If we navigated to this page, we will have a topic available as a nav param
    this.selectedTopic = navParams.get('topic');
    this.useLocalImages = platform.is('cordova');
    this.articles = [];

    console.log(this.selectedTopic);

    let cards: Content.Card[] = this.selectedTopic.topic.cards;
    for (let i = 0; i < cards.length; i++) {      
      this.articles.push({
        title: cards[i].title['ar'],
        translation: cards[i].title['en-US'],
        template: cards[i].constructor.name,
        card: cards[i],
      });
    }
    
  }
}
