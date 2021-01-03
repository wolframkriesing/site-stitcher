export class BlogPostSourceFile {
  dateCreated: DateString | DateTimeString;
  filename: Filename;

  static withFilename(filename: Filename): BlogPostSourceFile;
}
