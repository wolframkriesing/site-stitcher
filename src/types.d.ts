type Filename = string;
type Path = string;
type DateString = string; // can we say: 2000-01-01 as a type?
type DateTimeString = string; // can we say: "2000-01-01 10:00 CET" as a type? just like in https://schema.org/dateCreated it can also be both

// type AbsoluteUrl = string; // e.g. http://all.com/stuff.html
type RelativeUrl = string; // e.g. /blog/2000/01/01-post/
// type PicostitchUrl = AbsoluteUrl | RelativeUrl; // eventually, if possible let it be a real URL type

type PlainObject = {
  [key: string]: any;
};

type Slug = string;

type Tag = {
  value: string;
  slug: Slug;
}

type YearAndMonth = string; // e.g. '2020-10'

interface Article {
  dateCreated: DateString | DateTimeString;
  oldUrls:  RelativeUrl[];
  tags:  Tag[];
  url: string;
}

interface ArticlesGroupedByTag {
  tagSlug: Tag['slug'];
  articles: Article[];
  gradientWidthInPercent: number;
}
interface ArticlesGroupedByYearAndMonth {
  yearAndMonth: YearAndMonth;
  articles: Article[];
  gradientWidthInPercent: number;
}
