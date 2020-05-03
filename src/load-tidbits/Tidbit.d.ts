export class Tidbit {
  abstract: string;
  sourceFilename: Filename;
  url: string;

  dateCreated: DateTimeString;
  tags: string[];
  oldUrls: string[];
}

// actually this is a duplicate of what is in `Tidbit` too mmmh
export type TidbitMetadata = {
  dateCreated: DateTimeString;
  tags: string[];
  oldUrls: string[];
}
