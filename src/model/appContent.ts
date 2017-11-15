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

    populateChildIds(ids: any[], container: any[] = null) {
        if (ids != null) {
            let list = container != null ? container : this.childIds;
            ids.forEach(i => {
                list.push(i.sys.id)
            });
        }
    }
}

export class Category extends ContentBase {
    public color: string;
    public topics: Topic[] = new Array<Topic>();

    constructor(id: string, slug: string, title: Map<string, string>, color: string, topicList: any[]) {
        super(id, slug, title);
        this.color = color;
        this.populateChildIds(topicList);
    }
}

export class Topic extends ContentBase {
    public cards: Card[] = new Array<Card>();
    public icon: string;

    constructor(id: string, slug: string, title: Map<string, string>, icon: string, cardList: any[]) {
        super(id, slug, title);
        this.icon = icon;
        this.populateChildIds(cardList);
    }
}

// L3

export abstract class Card extends ContentBase {
    constructor(id: string, title: Map<string, string>) {
        super(id, null, title);
    }
}

export class CardTextBlock extends Card {
    // Uses 'Description'
    constructor(id: string, title: Map<string, string>) {
        super(id, title);
    }
}

export class CardImageTextBlock extends Card {
    // Uses 'Description'
    public image: Image;
    constructor(id: string, title: Map<string, string>) {
        super(id, title);
    }
}

export class CardExampleComparison extends Card {
    // Uses 'Description'
    public image_positive: Image;
    public image_negative: Image;
    constructor(id: string, title: Map<string, string>) {
        super(id, title);
    }
}

export class CardRulesComparison extends Card {
    // Uses 'Title'
    public image: Image;
    public dos: MediaItem[] = new Array<MediaItem>();
    public donts: MediaItem[] = new Array<MediaItem>();
    public doIds: string[] = new Array<string>();
    public dontIds: string[] = new Array<string>();
    constructor(id: string, title: Map<string, string>, dosList: any[], dontsList: any[]) {
        super(id, title);
        this.populateChildIds(dosList, this.doIds);
        this.populateChildIds(dontsList, this.dontIds);
    }

    findMediaChildren(media: MediaItem[]) {
        media.forEach(m => {
            if (this.doIds.findIndex(i => i == m.id) >= 0) this.dos.push(m)
            if (this.dontIds.findIndex(i => i == m.id) >= 0) this.donts.push(m)
        });
    }
}

export class CardItemsExplanation extends Card {
    // Uses 'Description' and 'Title'
    public image: Image;
    public items: MediaItem[] = new Array<MediaItem>();
    constructor(id: string, title: Map<string, string>, itemList: any[]) {
        super(id, title);
        this.populateChildIds(itemList);
    }

    findMediaChildren(media: MediaItem[]) {
        media.forEach(m => { if (this.childIds.findIndex(c => c == m.id) >= 0) this.items.push(m) });
    }
}

export class CardUnitComparison extends Card {
    // Uses 'Description'
    public image: string;
    public units: UnitComparison[] = new Array<UnitComparison>();
    constructor(id: string, title: Map<string, string>, unitList: any[]) {
        super(id, title);
        this.populateChildIds(unitList);
    }

    findUnitChildren(unit: UnitComparison[]) {
        unit.forEach(u => { if (this.childIds.findIndex(c => c == u.id) >= 0) this.units.push(u) });
    }
}

export class CardMonth extends Card {
    // Uses neither 'Description' nor 'Title'
    // Use Month for title
    public dates: DateBase[] = new Array<DateBase>();
    constructor(id: string, title: Map<string, string>, dateList: any[]) {
        super(id, title);
        this.populateChildIds(dateList);
    }

    findDateChildren(dates: DateBase[]) {
        dates.forEach(d => { if (this.childIds.findIndex(c => c == d.id) >= 0) this.dates.push(d) });
    }
}

// Other supporting Content types (children of Cards)

export class Image {
    public id: string;
    public value: any;
    constructor(id: string) {
        this.id = id;
    }
}

export abstract class DateBase extends ContentBase { }

export class SpecificDate extends DateBase {
    // Uses 'Title'
    public dayOfMonth: number;
    constructor(id: string, title: Map<string, string>, dayOfMonth: number) {
        super(id, null, title);
        this.dayOfMonth = dayOfMonth;
    }
}

export class GenericDate extends DateBase {
    // Uses 'Title'
    public weekOfMonth: number;
    public dayOfWeek: string;
    constructor(id: string, title: Map<string, string>, weekOfMonth: number, dayOfWeek: string) {
        super(id, null, title);
        this.weekOfMonth = weekOfMonth;
        this.dayOfWeek = dayOfWeek;
    }
}

export class MediaItem extends ContentBase {
    // Uses ItemText for title
    public iconClass: string;
    public iconImage: string;
    constructor(id: string, title: Map<string, string>, iconClass: string, iconImage: string) {
        super(id, null, title);
        this.iconClass = iconClass;
        this.iconImage = iconImage;
    }
}

export class UnitComparison extends ContentBase {
    // Uses 'Title'
    public leftUnit: Unit;
    public rightUnit: Unit;
    public leftId: string;
    public rightId: string;
    constructor(id: string, title: Map<string, string>, leftUnit: string, rightUnit: string, key: string) {
        super(id, null, title);
        this.leftId = this.extractUnitId(leftUnit, key);
        this.rightId = this.extractUnitId(rightUnit, key);
    }

    extractUnitId(unit, key) { return unit != null && unit[key] != null ? unit[key].sys.id : null; }

    findUnitChildren(units: Unit[]) {
        units.forEach(u => {
            if (u.id == this.leftId) this.leftUnit = u;
            else if (u.id == this.rightId) this.rightUnit = u;
        });
    }
}

export class Unit extends ContentBase {
    // Uses 'Title'
    public name: string;
    public value: string;
    constructor(id: string, title: Map<string, string>, name: string, value: string) {
        super(id, null, title);
        this.name = name;
        this.value = value;
    }
}

export class ContentTypes {
    public static readonly Category: string = 'category';
    public static readonly Topic: string = 'topic';

    public static readonly CardTextBlock: string = 'cardTextBlock';
    public static readonly CardImageTextBlock: string = 'cardImageTextBlock';
    public static readonly CardExampleComparison: string = 'cardExampleComparison';
    public static readonly CardRulesComparison: string = 'cardRulesComparison';
    public static readonly CardItemsExplanation: string = 'cardItemsExplanation';
    public static readonly CardUnitComparison: string = 'cardUnitComparison';
    public static readonly CardMonth: string = 'cardMonth';

    public static readonly SpecificDate: string = 'specificDate';
    public static readonly GenericDate: string = 'genericDate';
    public static readonly MediaItem: string = 'mediaItem';
    public static readonly UnitComparison: string = 'unitComparison';
    public static readonly Unit: string = 'unit';

}