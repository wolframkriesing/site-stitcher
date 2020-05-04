export class TidbitSourceFile {
  filename: Filename;
  monthAndYear: string;

  static withFilename(filename: Filename): TidbitSourceFile;
}
