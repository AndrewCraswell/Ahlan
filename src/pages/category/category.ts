import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { TopicPage } from '../topic/topic';
import { Topic } from "../../model/appContent";

@Component({
  selector: 'category',
  templateUrl: 'category.html'
})
export class CategoryPage {
  topicRows: Array<Array<{title: string, icon: string, translation: string, topic: Topic}>>;
  selectedCategory: any;
  categoryTabs: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedCategory = navParams.get('category');
    let topics = this.selectedCategory.category.topics;
    let numTopics = topics.length;
    this.topicRows = [];
    this.categoryTabs = 'Topics';

    console.log(this.selectedCategory);

    for(let i = 0; i < numTopics; i++) {
      var nextRow = new Array<{title: string, icon: string, translation: string, topic: Topic}>();
      var again = false;
      do {
        again = !again;
        topics[i].icon = topics[i].icon || 'fa-info-circle';

        nextRow.push({
            title: topics[i].title['ar'],
            icon: topics[i].icon,
            translation: topics[i].title['en-US'],
            topic: topics[i]
          });
      } while (again && ++i < numTopics)
      this.topicRows.push(nextRow);
    }
  }

  topicTapped(event, topic) {
    this.navCtrl.push(TopicPage, {
      topic: topic
    });
  }
}
