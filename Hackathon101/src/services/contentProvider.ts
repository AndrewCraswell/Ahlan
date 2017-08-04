import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { Category, Topic, Card, CardInfoTemplateOnly, CardInfoTemplateWithImg, CardDosDont, CardDosDontList, ContentTypes } from "../model/appContent";

@Injectable()
export class ContentProvider {
    categories: Array<Category>;
    contentReady: boolean = false;

    constructor(private storage: Storage) { }

    loadAppContent(): Promise<Category[]> {
        if (this.categories != null && this.contentReady) {
            return new Promise<Category[]>(() => this.categories );
        }

        this.categories = new Array<Category>();

         return this.storage.get('content').then(content => {
            console.log("Parsing content in Provider.");
            if (content == null) { return null; }
            var tempTops: Array<Topic> = new Array<Topic>();
            var tempCards: Array<Card> = new Array<Card>();
            var c = null;
            let length: number = content.total;
            for(let i = 0; i < length; i++) {
                let element = content.items[i];
                let contentType: string = element.sys.contentType.sys.id;
                let fields = element.fields;
                if (contentType == ContentTypes.Category) {
                    var cat = new Category(
                        element.sys.id,
                        fields.categorySlug,
                        fields.title,
                        fields.color['en-US']);
                    var topicsColl = fields.topicsCollection;
                    if (topicsColl == null) { topicsColl = fields.articlesCollection; }
                    topicsColl['en-US'].forEach(a => {
                        cat.childIds.push(a.sys.id);
                    });
                    this.categories.push(cat);
                }
                else if (contentType == ContentTypes.Topic
                || contentType == 'article') {
                    var slug = fields.topicSlug;
                    if (slug == null) { slug = fields.articleSlug; }
                    var top = new Topic(
                        element.sys.id,
                        slug,
                        fields.title);
                    let icon = fields.iconClass;
                    if (icon != null && icon['en-US'] != null) { top.icon = icon['en-US']; }
                    let cardColl = fields.cardsCollection;
                    if (cardColl != null && cardColl['en-US'] != null) {
                        cardColl['en-US'].forEach(c => {
                            top.childIds.push(c.sys.id);
                        });
                    }
                    tempTops.push(top);
                }
                else if (contentType == ContentTypes.CardInfoTemplateOnly) {
                    c = new CardInfoTemplateOnly(
                        element.sys.id,
                        fields.slugInfoOnly,
                        fields.TitleInfoOnly,
                        contentType);
                    tempCards.push(c);
                }
                else if (contentType == ContentTypes.CardInfoTemplateWithImg) {
                    c = new CardInfoTemplateWithImg(
                        element.sys.id,
                        fields.slugInfoWithImg,
                        fields.titleInfoWithImg,
                        contentType,
                        fields.mediaInfowithImg);   
                    tempCards.push(c);
                }
                else if (contentType == ContentTypes.CardDosDont) {
                    c = new CardDosDont(
                        element.sys.id,
                        fields.slugDosDont,
                        fields.titleDosDont,
                        contentType,
                        fields.mediaDosDont); 
                    tempCards.push(c);
                }
                else if (contentType == ContentTypes.CardDosDontList) {
                    c = new CardDosDontList(
                        element.sys.id,
                        fields.slugDosDontList,
                        fields.titleDosDontList,
                        contentType,
                        fields.mediaDosDont,
                        fields.dosListText,
                        fields.dontListText,
                        fields.dosListIcon,
                        fields.dontListIcon);
                    tempCards.push(c);
                }
            }

            var cardToLink = tempCards.pop();
            while (cardToLink != null) {
                let length = tempTops.length
                for (let i = 0; i < length; i++) {
                    let top = tempTops[i];
                    let numCards = top.childIds.length;
                    var foundTop = false;
                    for (let j = 0; j < numCards; j++) {
                        if (top.childIds[j] == cardToLink.id) {
                            top.cards.push(cardToLink);
                            cardToLink.parent = top;
                            foundTop = true;
                            break;
                        }
                    }
                    if (foundTop) break;
                }
                cardToLink = tempCards.pop();
            }

            var topToLink = tempTops.pop();
            while (topToLink != null) {
                let length = this.categories.length
                for (let i = 0; i < length; i++) {
                    let cat = this.categories[i];
                    let numArts = cat.childIds.length;
                    var foundCat = false;
                    for (let j = 0; j < numArts; j++) {
                        if (cat.childIds[j] == topToLink.id) {
                            cat.topics.push(topToLink);
                            topToLink.parent = cat;
                            foundCat = true;
                            break;
                        }
                    }
                    if (foundCat) break;
                }
                topToLink = tempTops.pop();
            }

            this.categories.sort((a, b) => {
                return this.categorySortOrder.indexOf(a.id) - this.categorySortOrder.indexOf(b.id);
            });

            this.contentReady = true;
            return this.categories;
        });
    }

    categorySortOrder = [
        '2pTwwcY4cYEyE6WymousaG',
        '4Kpjj8p4Lm2Ue0eig0GkYe',
        'Bs0Nh2qPZYwWUEOsKQUuG',
        '2qz5IBH4qM4G2yIwUMGWay',
        '4FfiKbFjg4ImqEeyyGsu48',
        '4K8JUyNPI4A8oWS6kW4moY',
        '1EoR1dli0Yk88KKOUC0SCi'
    ]
}