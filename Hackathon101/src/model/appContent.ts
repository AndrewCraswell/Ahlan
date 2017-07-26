export class Category {
    public id: string;
    public slug: string;
    public title: Map<string, string>;
    public color: string;
    public articles: Article[] = new Array<Article>();
    public articleIds: string[] = new Array<string>();
}

export class Article {
    public id: string;
    public slug: string;
    public title: Map<string, string>;
    public color: string;
    public cards: Card[] = new Array<Card>();
    public cardIds: string[] = new Array<string>();
}

export class Card {
    public id: string;
    public slug: string;
    public title: Map<string, string>;
    public color: string;
}