import { Component, Type, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import * as Content from "../../model/appContent";
import { Platform } from 'ionic-angular/platform/platform';

type ArticleArray = Array<{title: string, translation: string, template: string, card: Content.Card}>;

@Component({
  selector: 'topic',
  templateUrl: 'topic.html'
})
export class TopicPage {
  selectedTopic: any;
  topic: Content.Topic;
  articles: ArticleArray;
  useLocalImages: boolean;
  componentRef;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    platform: Platform,
    private vcRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver) {

    // If we navigated to this page, we will have a topic available as a nav param
    this.selectedTopic = navParams.get('topic');
    this.useLocalImages = platform.is('cordova');

    // Create a list of articles to render
    this.articles = this.loadArticles(this.selectedTopic.topic.cards);
  }

  public ngOnDestroy(){
    if (this.componentRef) {
        this.componentRef.destroy();
        this.componentRef = null;
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
      });
    }

    return articles;
  }

  private resolveArticleComponents(articles: ArticleArray) {
    var comp: string = 'CardText';

    // Resolve the correct component to render each article data
    for (var i = 0; i < articles.length; i++) {
      var factories = Array.from(this.resolver['_factories'].keys());
      var factoryClass = <Type<any>>factories.find((x: any) => x.name === comp);
      const factory = this.resolver.resolveComponentFactory(factoryClass);
      const compRef = this.vcRef.createComponent(factory);
      compRef.instance.article = articles[0].card;

      // TODO: Render the component on the page
    }
  }
}
