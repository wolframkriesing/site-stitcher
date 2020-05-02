export class TidbitSourceFile {
  /**
   * @param {Filename} filename
   * @return {TidbitSourceFile}
   */
  static withFilename(filename) {
    const blogPost = new TidbitSourceFile();
    blogPost.filename = filename;
    return blogPost;
  }
  get monthAndYear() {
    return this.filename.split('/').slice(-3, -1).join('-');
  }
}
