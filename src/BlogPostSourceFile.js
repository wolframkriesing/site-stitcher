/**
 * @param {Filename} markdownFilename
 * @return {Filename}
 */
const dateDirectoryAndFilename = markdownFilename => markdownFilename.match(/\d{4}\/\d{2}\/\d{2}-.*/)[0];
/**
 * @param {string} s
 * @return {string}
 */
const directoryToIsoDate = s => s.split('-')[0].replace(/\//g, '-');
/**
 * @param {Filename} markdownFilename
 * @return {DateString}
 */
const dateCreatedFromMarkdownFilename = (markdownFilename) =>
  directoryToIsoDate(dateDirectoryAndFilename(markdownFilename));

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
    return dateCreatedFromMarkdownFilename(this.filename);
  }
}
