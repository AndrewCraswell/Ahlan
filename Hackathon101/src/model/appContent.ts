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

export abstract class Card {
    public id: string;
    public slug: string;
    public title: Map<string, string>;
    public color: string;
    public template: string;

    constructor(id: string, slug: string, title: Map<string, string>, template: string) {
        this.id = id;
        this.slug = slug;
        this.title = title;
        this.template = template;
    }
}

export class CardInfoTemplateOnly extends Card {
    constructor(id: string, slug: string, title: Map<string, string>, template: string) {
        super(id, slug, title, template);
    }
}