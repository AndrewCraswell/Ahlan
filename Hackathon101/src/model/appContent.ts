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

export class CardInfoTemplateWithImg extends Card {
    public mediaInfoWithImg:string;
    constructor(id: string, slug: string, title: Map<string, string>, template: string, mediaInfoWithImg:string) {
        super(id, slug, title, template);
        this.mediaInfoWithImg=mediaInfoWithImg;
    }
    
}

export class CardDosDont extends Card {
    public mediaDosDont:string[] = new Array<string>();
    constructor(id: string, slug: string, title: Map<string, string>, template: string, mediaDosDont: string[]) {
        super(id, slug, title, template);
        this.mediaDosDont=mediaDosDont;
    }
   
}

export class CardDosDontList extends Card {
    public mainImageDosDontList:string;
    public dosListText:string[] = new Array<string>();
    public dontListText:string[] = new Array<string>(); 
    public dosListIcon:string[] = new Array<string>();
    public dontListIcon:string[] = new Array<string>(); 
    constructor(id: string, slug: string, title: Map<string, string>, template: string, mainImageDosDontList:string,dosListText:string[],dontListText:string[],dosListIcon:string[],dontListIcon:string[]) {
        super(id, slug, title, template);
        this.mainImageDosDontList=mainImageDosDontList;
        this.dosListText=dosListText;
        this.dontListText=dontListText;
        this.dosListIcon=dosListIcon;
        this.dontListIcon=dontListIcon;
    }   
}

export class ContentTypes {
    public static readonly Category: string = 'category';
    public static readonly Article: string = 'article';
    public static readonly CardInfoTemplateOnly: string = 'cardInfoTemplateOnly';
}