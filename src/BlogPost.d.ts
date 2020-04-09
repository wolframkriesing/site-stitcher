type DateString = string; // can we say: 2000-01-01 as a type?

export class BlogPost {
  dateCreated: DateString;
  abstract: string;
  markdownFilename: string;
  url: string;
  static preload(markdownFilename: string): BlogPost;
  equals(blogPost: BlogPost): boolean;
}
