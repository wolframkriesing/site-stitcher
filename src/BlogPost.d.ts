type DateString = string; // can we say: 2000-01-01 as a type?
type DateTimeString = string; // can we say: "2000-01-01 10:00 CET" as a type? just like in https://schema.org/dateCreated it can also be both

export class BlogPost {
  dateCreated: DateString | DateTimeString;
  abstract: string;
  markdownFilename: string;
  url: string;
  bodyAsHtml: string;
  static preload(markdownFilename: string): BlogPost;
  equals(blogPost: BlogPost): boolean;
}

export type BlogPostMetadata = {
  dateCreated?: DateString | DateTimeString;
  tags: string[];
  oldUrls: string[];
}
