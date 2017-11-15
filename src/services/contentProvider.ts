import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { ContentUpdater } from "./contentUpdater";
import { Category, Topic, Card, CardTextBlock, CardImageTextBlock, CardExampleComparison,
        CardRulesComparison, CardItemsExplanation, CardUnitComparison, CardMonth, DateBase,
        GenericDate, SpecificDate, MediaItem, UnitComparison, Unit, ContentTypes } from "../model/appContent";

@Injectable()
export class ContentProvider {
    categories: Array<Category>;
    contentReady: boolean = false;

    constructor(private storage: Storage, private contentUpdater: ContentUpdater) { }

    getLocalContent(): Promise<Category[]> {
        if (this.contentReady) {
            return new Promise<Category[]>(() => this.categories );
        }
        
        return this.updateContent();
    }

    // Utility function for testing
    clearLocalContent() {
        return this.storage.set('content', null).then(() => {
            return null;
        });
    }

    getUpdatedContent(): Promise<Category[]> {
        return this.contentUpdater.refreshContent().then(() =>
            this.updateContent()
        );
    }

    private updateContent(): Promise<Category[]> {
        return this.storage.get('content').then(content => {
            console.log("Parsing content in Provider.");
            this.categories = this.parseJsonContent(content);
            this.contentReady = true;
            return this.categories;
        });
    }

    private parseJsonContent(content: any): Category[] {
        if (content == null) return null;

        var newContent = new Array<Category>();
        var tempTopics = new Array<Topic>();
        var tempCards = new Array<Card>();
        var tempDates = new Array<DateBase>();
        var tempMedia = new Array<MediaItem>();
        var tempUnitPair = new Array<UnitComparison>();
        var tempUnits = new Array<Unit>();
        let length: number = content.total;
        for(let i = 0; i < length; i++) {
            let element = content.items[i];
            let contentType: string = element.sys.contentType.sys.id;
            let fields = element.fields;
            switch(contentType)
            {
                // L1
                case ContentTypes.Category:
                    var topicsColl = fields.topicsCollection;
                    if (topicsColl == null) { topicsColl = fields.articlesCollection; }
                    var cat = new Category(
                        element.sys.id,
                        fields.categorySlug,
                        fields.title,
                        fields.color['en-US'],
                        this.getKeyIfNotNull(topicsColl, 'en-US'));
                    newContent.push(cat);
                    break;
                // L2
                case ContentTypes.Topic:
                case 'article':
                    var slug = fields.topicSlug;
                    if (slug == null) { slug = fields.articleSlug; }
                    var top = new Topic(
                        element.sys.id,
                        slug,
                        fields.title,
                        this.getKeyIfNotNull(fields.iconClass, 'en-US'),
                        this.getKeyIfNotNull(fields.cardsCollection, 'en-US'));
                        tempTopics.push(top);
                    break;

                // L3 Types (Cards)
                case ContentTypes.CardTextBlock:
                    tempCards.push(new CardTextBlock(
                        element.sys.id,
                        fields.description));
                    break;
                case ContentTypes.CardImageTextBlock:
                    tempCards.push(new CardImageTextBlock(
                        element.sys.id,
                        fields.description));
                    break;
                case ContentTypes.CardExampleComparison:
                    tempCards.push(new CardExampleComparison(
                        element.sys.id,
                        fields.description));
                        // add images
                    break;
                case ContentTypes.CardRulesComparison:
                    tempCards.push(new CardRulesComparison(
                        element.sys.id,
                        fields.title,
                        this.getKeyIfNotNull(fields.dosList, 'en-US'),
                        this.getKeyIfNotNull(fields.dontsList, 'en-US')));
                    break;
                case ContentTypes.CardItemsExplanation:
                    tempCards.push(new CardItemsExplanation(
                        element.sys.id,
                        fields.title,
                        this.getKeyIfNotNull(fields.itemsList, 'en-US')));
                    break;
                case ContentTypes.CardUnitComparison:
                    tempCards.push(new CardUnitComparison(
                        element.sys.id,
                        fields.description,
                        this.getKeyIfNotNull(fields.unitList, 'en-US')));
                    break;
                case ContentTypes.CardMonth:
                    tempCards.push(new CardMonth(
                        element.sys.id,
                        fields.month,
                        this.getKeyIfNotNull(fields.datesList, 'en-US')));
                    break;

                // Supporting content (children of L3)
                case ContentTypes.GenericDate:
                    tempDates.push(new GenericDate(
                        element.sys.id,
                        fields.title,
                        fields.weekOfMonth,
                        fields.dayOfWeek));
                    break;
                case ContentTypes.SpecificDate:
                    tempDates.push(new SpecificDate(
                        element.sys.id,
                        fields.title,
                        fields.dayOfMonth));
                    break;
                case ContentTypes.MediaItem:
                    tempMedia.push(new MediaItem(
                        element.sys.id,
                        fields.itemText,
                        fields.iconClass,
                        fields.iconImage));
                    break;
                case ContentTypes.UnitComparison:
                    tempUnitPair.push(new UnitComparison(
                        element.sys.id,
                        fields.title,
                        fields.leftUnit,
                        fields.rightUnit,
                        'en-US'));
                    break;
                case ContentTypes.Unit:
                    tempUnits.push(new Unit(
                        element.sys.id,
                        fields.title,
                        fields.name,
                        fields.value));
                    break;
            }
        }

        console.log("Got Categories, Topics, Cards, Dates, Media, UnitPairs, Units:",
            newContent.length, tempTopics.length, tempCards.length,
            tempDates.length, tempMedia.length, tempUnitPair.length, tempUnits.length);

        // Link Units to the UnitComparisons that reference them
        tempUnitPair.forEach(pair => {
            pair.findUnitChildren(tempUnits);
        });

        // Link supporting content to their Cards
        tempCards.forEach(card => {
            switch (card.constructor.name) {
                case CardRulesComparison.name:
                    (card as CardRulesComparison).findMediaChildren(tempMedia);
                    break;
                case CardItemsExplanation.name:
                    (card as CardItemsExplanation).findMediaChildren(tempMedia);
                    break;
                case CardUnitComparison.name:
                    (card as CardUnitComparison).findUnitChildren(tempUnitPair);
                    break;
                case CardMonth.name:
                    (card as CardMonth).findDateChildren(tempDates);
                    break;
            }
        });

        // Loop through all Card content and link each to the Topic that owns it
        var cardToLink = tempCards.pop();
        while (cardToLink != null) {
            let length = tempTopics.length;
            for (let i = 0; i < length; i++) {
                let top = tempTopics[i];
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

        // Loop through all Topic content and link each to the Category that owns it
        var topToLink = tempTopics.pop();
        while (topToLink != null) {
            let length = newContent.length;
            for (let i = 0; i < length; i++) {
                let cat = newContent[i];
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
            topToLink = tempTopics.pop();
        }

        newContent.sort((a, b) => {
            return this.categorySortOrder.indexOf(a.id) - this.categorySortOrder.indexOf(b.id);
        });

        this.contentReady = true;
        return newContent;
    }

    getKeyIfNotNull(map: Map<string, any>, key: string) {
        return map != null ? map[key] : null;
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