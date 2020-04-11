/**
 * @param {Filename} filename
 * @return {Filename}
 */
const dateDirectoryAndFilename = filename => filename.match(/\d{4}\/\d{2}\/\d{2}-.*/)[0];
/**
 * @param {string} s
 * @return {string}
 */
const directoryToIsoDate = s => s.split('-')[0].replace(/\//g, '-');
/**
 * @param {Filename} filename
 * @return {DateString}
 */
const dateCreatedFromFilename = (filename) =>
  directoryToIsoDate(dateDirectoryAndFilename(filename));

export class BlogPostSourceFile {
  /**
   * @param {Filename} filename
   * @return {BlogPostSourceFile}
   */
  static withFilename(filename) {
    const blogPost = new BlogPostSourceFile();
    blogPost.filename = filename;
    return blogPost;
  }
  get dateCreated() {
    return dateCreatedFromFilename(this.filename);
  }
}
