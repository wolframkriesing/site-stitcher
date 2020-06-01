type Slug = string;
type Tag = {
  value: string;
  slug: Slug;
}

export type RawTidbit = {
  abstractAsHtml: string;
  bodyAsHtml: string;
  headline: string;
  hasAbstractOnly: boolean;
  headlineAsHtml: string;
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
  abstractAsHtml: RawTidbit['abstractAsHtml'];
  bodyAsHtml: RawTidbit['bodyAsHtml'];
  dateCreated: TidbitMetadata['dateCreated'];
  hasAbstractOnly: RawTidbit['hasAbstractOnly'];
  headline: RawTidbit['headline'];
  headlineAsHtml: RawTidbit['headlineAsHtml'];
  oldUrls: TidbitMetadata['oldUrls'];
  sourceFilename: Filename;
  slug: TidbitMetadata['slug'];
  tags: Tag[];
  url: RelativeUrl;


  static withRawData(raw: RawTidbit): Tidbit;
}
