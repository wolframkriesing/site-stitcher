type Slug = string;
type Tag = {
  value: string;
  slug: Slug;
}

type RawTidbit = {
  headline: string;
  dateCreated: DateTimeString;
  tags: string[];
  slug: string;
};

export type TidbitMetadata = {
  dateCreated: DateTimeString;
  tags: string[];
  oldUrls: RelativeUrl[];
  slug: string;
}

export class Tidbit {
  abstractAsHtml: string;
  bodyAsHtml: string;
  dateCreated: TidbitMetadata['dateCreated'];
  headline: string;
  oldUrls: TidbitMetadata['oldUrls'];
  sourceFilename: Filename;
  slug: TidbitMetadata['slug'];
  tags: TidbitMetadata['tags'];
  url: RelativeUrl;


  static withRawData(raw: RawTidbit): Tidbit;
}
