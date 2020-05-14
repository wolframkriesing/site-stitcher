export type BlogPostMetadata = {
  dateCreated: DateString | DateTimeString;
  isDraft: boolean;
  oldUrls: string[];
  tags: string[];
}

export class BlogPost {
  abstractAsHtml: string;
  bodyAsHtml: string;
  dateCreated: BlogPostMetadata['dateCreated'];
  hasVideo: boolean;
  isDraft: BlogPostMetadata['isDraft'];
  markdownFilename: Filename;
  oldUrls:  BlogPostMetadata['oldUrls'];
  tags:  BlogPostMetadata['tags'];
  url: string;
  vimeoId?: string;
  videoStartTime?: string;
  youtubeId?: string;

  static preload(markdownFilename: string): BlogPost;
}
