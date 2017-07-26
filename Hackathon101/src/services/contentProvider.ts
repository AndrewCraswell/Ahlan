import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { Category, Article, Card } from "../model/appContent";

@Injectable()
export class ContentProvider {
    categories: Array<Category>;

    constructor(private storage: Storage) { }

    loadAppContent(): Promise<Category[]> {
        this.categories = new Array<Category>();

         return this.storage.get('content').then(content => {
            var tempArts: Array<Article> = new Array<Article>();
            var tempCards: Array<Card> = new Array<Card>();
            let length: number = content.total;
            for(let i = 0; i < length; i++) {
                let element = content.items[i];
                let contentType: string = element.sys.contentType.sys.id;
                let fields = element.fields;
                if (contentType == "category") {
                    var cat = new Category();
                    cat.id = element.sys.id;
                    cat.slug = fields.categorySlug;
                    cat.title = fields.title;
                    cat.color = fields.color['en-US'];
                    fields.articlesCollection['en-US'].forEach(a => {
                        cat.articleIds.push(a.sys.id);
                    });
                    this.categories.push(cat);
                }
                else if (contentType == 'article') {
                    var art = new Article();
                    art.id = element.sys.id;
                    art.slug = fields.categorySlug;
                    art.title = fields.title;
                    let cardColl = fields.cardsCollection;
                    if (cardColl != null && cardColl['en-US'] != null) {
                        cardColl['en-US'].forEach(c => {
                            art.cardIds.push(c.sys.id);
                        });
                    }
                    tempArts.push(art);
                }
                else if (contentType == 'cardInfoTemplateOnly') {
                    var c = new Card();
                    c.id = element.sys.id;
                    c.slug = fields.categorySlug;
                    c.title = fields.title;
                    tempCards.push(c);
                }
            }

            var cardToLink = tempCards.pop();
            while (cardToLink != null) {
                let length = tempArts.length
                for (let i = 0; i < length; i++) {
                    let art = tempArts[i];
                    let numCards = art.cardIds.length;
                    var foundArt = false;
                    for (let j = 0; j < numCards; j++) {
                        if (art.cardIds[j] == cardToLink.id) {
                            art.cards.push(cardToLink);
                            foundArt = true;
                            break;
                        }
                    }
                    if (foundArt) break;
                }
                cardToLink = tempCards.pop();
            }

            var artToLink = tempArts.pop();
            while (artToLink != null) {
                let length = this.categories.length
                for (let i = 0; i < length; i++) {
                    let cat = this.categories[i];
                    let numArts = cat.articleIds.length;
                    var foundCat = false;
                    for (let j = 0; j < numArts; j++) {
                        if (cat.articleIds[j] == artToLink.id) {
                            cat.articles.push(artToLink);
                            foundCat = true;
                            break;
                        }
                    }
                    if (foundCat) break;
                }
                artToLink = tempArts.pop();
            }

            this.categories.sort((a, b) => {
                return this.categorySortOrder(a.id) - this.categorySortOrder(b.id);
            });

          return this.categories;
        });
    }

    categorySortOrder(id: string): number {
        if (id == '2pTwwcY4cYEyE6WymousaG') {
            // at home
            return 0;
        }
        if (id == '4Kpjj8p4Lm2Ue0eig0GkYe') {
            // shopping
            return 1;
        }
        if (id == 'Bs0Nh2qPZYwWUEOsKQUuG') {
            // on the road
            return 2;
        }
        if (id == '2qz5IBH4qM4G2yIwUMGWay') {
            // conversion
            return 3;
        }
        if (id == '4FfiKbFjg4ImqEeyyGsu48') {
            // finance
            return 4;
        }
        if (id == '4K8JUyNPI4A8oWS6kW4moY') {
            // holidays
            return 5;
        }
        if (id == '1EoR1dli0Yk88KKOUC0SCi') {
            // holidays
            return 6;
        }
    }
}