import { Component, Type, ViewContainerRef, ComponentFactoryResolver, ViewChild } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import * as Content from "../../model/appContent";
import { Platform } from 'ionic-angular/platform/platform';

type ArticleArray = Array<{title: string, translation: string, template: string, card: Content.Card, component: any}>;

@Component({
  selector: 'topic',
  templateUrl: 'topic.html'
})
export class TopicPage {
  @ViewChild("articlesContainer", { read: ViewContainerRef }) articlesContainer;

  selectedTopic: any;
  topic: Content.Topic;
  articles: ArticleArray;
  useLocalImages: boolean;
  componentRef;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    platform: Platform,
    private resolver: ComponentFactoryResolver) {

    // If we navigated to this page, we will have a topic available as a nav param
    this.selectedTopic = navParams.get('topic');
    this.useLocalImages = platform.is('cordova');

    // Create a list of articles to render
    this.articles = this.loadArticles(this.selectedTopic.topic.cards);
  }

  public ngOnDestroy(){
    for (var i = 0; i < this.articles.length; i++) {
      if (this.articles[0].component) {
        this.articles[0].component.destroy();
        this.articles[0].component = null;
      }
    }
  }

  public ngOnInit(){
    // Resolve each component that correlates to the article
    this.resolveArticleComponents(this.articles);
  }

  private loadArticles(cards: Content.Card[]) {
    let articles: ArticleArray = [];
    for (let i = 0; i < cards.length; i++) {      
      articles.push({
        title: cards[i].title['ar'],
        translation: cards[i].title['en-US'],
        template: cards[i].constructor.name,
        card: cards[i],
        component: undefined
      });
    }

    return articles;
  }

  private resolveArticleComponents(articles: ArticleArray) {
    this.articlesContainer.clear(); 

    // Resolve the correct component to render each article data
    for (var i = 0; i < articles.length; i++) {
      var templateName: string = articles[0].template;
      articles[i].component = this.createComponent(templateName);

      if (articles[i].component && articles[i].component.instance) {
        articles[i].component.instance.article = articles[0].card;
      } else {
        console.log('Unable to map Article to the', templateName, 'component. No such component exists.');
      }
    }
  }

  private createComponent(templateName: string) {
    var factories = Array.from(this.resolver['_factories'].keys());
    var factoryClass = <Type<any>>factories.find((x: any) => x.name === templateName);
    
    if (factoryClass) {
      const factory = this.resolver.resolveComponentFactory(factoryClass);

      if (factory) {
        return this.articlesContainer.createComponent(factory);
      }
    }

    return undefined;
  }
}
