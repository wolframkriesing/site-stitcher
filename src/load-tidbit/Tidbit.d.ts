type Slug = string;
type Tag = {
  value: string;
  slug: Slug;
}

export type RawTidbit = {
  abstract: string;
  abstractAsHtml: string;
  bodyAsHtml: string;
  dateCreated: DateTimeString;
  headline: string;
  hasAbstractOnly: boolean;
  headlineAsHtml: string;
  slug: string;
  tags: string[];
};

export type TidbitMetadata = {
  dateCreated: DateTimeString;
  oldUrls: RelativeUrl[];
  slug: string;
  tags: string[];
}

export class Tidbit {
  abstract: RawTidbit['abstract'];
  abstractAsHtml: RawTidbit['abstractAsHtml'];
  bodyAsHtml: RawTidbit['bodyAsHtml'];
  dateCreated: TidbitMetadata['dateCreated'];
  hasAbstractOnly: RawTidbit['hasAbstractOnly'];
  headline: RawTidbit['headline'];
  headlineAsHtml: RawTidbit['headlineAsHtml'];
  oldUrls: TidbitMetadata['oldUrls'];
  slug: TidbitMetadata['slug'];
  sourceFilename: Filename;
  tags: Tag[];
  url: RelativeUrl;

  static withRawData(raw: RawTidbit): Tidbit;
}
