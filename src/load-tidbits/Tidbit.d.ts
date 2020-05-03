// export class BlogPost {
//   dateCreated: DateString | DateTimeString;
//   abstract: string;
//   markdownFilename: Filename;
//   url: string;
//   abstractAsHtml: string;
//   bodyAsHtml: string;
//   youtubeId?: string;
//   vimeoId?: string;
//   videoStartTime?: string;
//   hasVideo: boolean;
//
//   static preload(markdownFilename: string): BlogPost;
//   equals(blogPost: BlogPost): boolean;
// }

export type TidbitMetadata = {
  dateCreated: DateTimeString;
  tags: string[];
  oldUrls: string[];
}
