import {BlogPostSourceFile} from "./BlogPostSourceFile";

export type RawBlogPost = {
  abstract: string;
  abstractAsHtml: string;
  bodyAsHtml: string;
  hasAbstractOnly: boolean;
  headline: string;
  headlineAsHtml: string;
};

export type BlogPostMetadata = {
  canonicalUrl: string;
  canonicalHint: string;
  dateCreated: DateString | DateTimeString;
  isDraft: boolean;
  oldUrls: string[];
  previewImage: string;
  tags: string[];
  vimeoId?: string;
  videoStartTime?: string;
  youtubeId?: string;
};

export class BlogPost implements Article {
  private _dateCreated: BlogPostMetadata['dateCreated'];
  abstract: RawBlogPost['abstract'];
  abstractAsHtml: RawBlogPost['abstractAsHtml'];
  bodyAsHtml: RawBlogPost['bodyAsHtml'];
  canonicalUrl: BlogPostMetadata['canonicalUrl'];
  canonicalHint: BlogPostMetadata['canonicalHint'];
  dateCreated: BlogPostMetadata['dateCreated'];
  hasVideo: boolean;
  isDraft: BlogPostMetadata['isDraft'];
  markdownFilename: Filename;
  oldUrls:  BlogPostMetadata['oldUrls'];
  tags:  Tag[];
  previewImageUrl: BlogPostMetadata['previewImage'];
  url: string;
  vimeoId?: BlogPostMetadata['vimeoId'];
  videoStartTime?: BlogPostMetadata['videoStartTime'];
  youtubeId?: BlogPostMetadata['youtubeId'];

  static withSourceFile(blogPostSourceFile: BlogPostSourceFile, rawBlogPostData: RawBlogPost): BlogPost;
  static withRawData(rawBlogPostData: RawBlogPost): BlogPost;
}
