export class TidbitSourceFile {
  /**
   * @param {Filename} filename
   * @return {TidbitSourceFile}
   */
  static withFilename(filename) {
    const sourceFile = new TidbitSourceFile();
    sourceFile.filename = filename;
    return sourceFile;
  }
  get monthAndYear() {
    return this.filename.split('/').slice(-3, -1).join('-');
  }
}
