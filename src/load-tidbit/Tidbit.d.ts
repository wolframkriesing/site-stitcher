type Slug = string;
type Tag = {
  value: string;
  slug: Slug;
}

export class Tidbit {
  abstractAsHtml: string;
  bodyAsHtml: string;
  headline: string;
  sourceFilename: Filename;
  url: RelativeUrl;
  slug: string;

  dateCreated: DateTimeString;
  tags: Tag[];
  oldUrls: string[];

  static withRawData(raw: PlainObject): Tidbit;
}

// actually this is a duplicate of what is in `Tidbit` too mmmh
export type TidbitMetadata = {
  dateCreated: DateTimeString;
  tags: string[];
  oldUrls: string[];
}
