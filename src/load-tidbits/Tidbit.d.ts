export class Tidbit {
  headline: string;
  abstract: string;
  sourceFilename: Filename;
  url: RelativeUrl;

  dateCreated: DateTimeString;
  tags: string[];
  oldUrls: string[];

  static withRawData(raw: PlainObject): Tidbit;
}

// actually this is a duplicate of what is in `Tidbit` too mmmh
export type TidbitMetadata = {
  dateCreated: DateTimeString;
  tags: string[];
  oldUrls: string[];
}
