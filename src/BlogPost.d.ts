export class BlogPost {
  dateCreated: DateString | DateTimeString;
  abstractAsHtml: string;
  markdownFilename: Filename;
  url: string;
  bodyAsHtml: string;
  youtubeId?: string;
  vimeoId?: string;
  videoStartTime?: string;
  hasVideo: boolean;

  static preload(markdownFilename: string): BlogPost;
  equals(blogPost: BlogPost): boolean;
}

export type BlogPostMetadata = {
  dateCreated: DateString | DateTimeString;
  tags: string[];
  oldUrls: string[];
}
