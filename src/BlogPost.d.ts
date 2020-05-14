export type BlogPostMetadata = {
  dateCreated: DateString | DateTimeString;
  oldUrls: string[];
  tags: string[];
}

export class BlogPost {
  abstractAsHtml: string;
  bodyAsHtml: string;
  dateCreated: BlogPostMetadata['dateCreated'];
  hasVideo: boolean;
  markdownFilename: Filename;
  oldUrls:  BlogPostMetadata['oldUrls'];
  tags:  BlogPostMetadata['tags'];
  url: string;
  vimeoId?: string;
  videoStartTime?: string;
  youtubeId?: string;

  static preload(markdownFilename: string): BlogPost;
}
