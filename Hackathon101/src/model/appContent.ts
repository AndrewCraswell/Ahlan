export abstract class ContentBase {
    public id: string;
    public slug: string;
    public title: Map<string, string>;
    public childIds: string[] = new Array<string>();
    public parent: ContentBase;

    constructor(id: string, slug: string, title: Map<string, string>) {
        this.id = id;
        this.slug = slug;
        this.title = title;
    }
}

export class Category extends ContentBase {
    public color: string;
    public topics: Topic[] = new Array<Topic>();

    constructor(id: string, slug: string, title: Map<string, string>, color: string) {
        super(id, slug, title);
        this.color = color;
    }
}

export class Topic extends ContentBase {
    public cards: Card[] = new Array<Card>();

    constructor(id: string, slug: string, title: Map<string, string>) {
        super(id, slug, title);
    }
}

export abstract class Card extends ContentBase {
    public template: string;

    constructor(id: string, slug: string, title: Map<string, string>, template: string) {
        super(id, slug, title);
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
    public static readonly Topic: string = 'topic';
    public static readonly CardInfoTemplateOnly: string = 'cardInfoTemplateOnly';
    public static readonly CardInfoTemplateWithImg: string = 'cardInfoTemplateWithImg';
    public static readonly CardDosDont: string = 'cardDosDont';
    public static readonly CardDosDontList: string = 'cardDosDontList';
}