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
/**
 * @param {Filename} markdownFilename
 * @return {RelativeUrl}
 */
const urlFromMarkdownFilename = (markdownFilename) => {
  const extensionToReplace = markdownFilename.endsWith('index.md') ? '/index.md' : '.md';
  return '/blog/' + dateDirectoryAndFilename(markdownFilename).replace(extensionToReplace, '/');
};
/**
 * @param path {RelativeUrl}
 * @return {RelativeUrl}
 */
const removeLastPartOfPath = path => path.split('/').slice(0, -2).join('/') + '/';
/**
 * @param {Filename} markdownFilename
 * @return {RelativeUrl}
 */
const urlForMonthFromMarkdownFilename = (markdownFilename) => {
  return removeLastPartOfPath(urlFromMarkdownFilename(markdownFilename));
};

export class BlogPost {
  static withSourceFile(blogPostSourceFile, rawBlogPostData) {
    const post = new BlogPost();
    post.markdownFilename = blogPostSourceFile.filename; // should this become a BlogPostSourceFile instance?
    Object.entries(rawBlogPostData).forEach(([key, value]) => post[key] = value);
    return post;
  }
  /**
   * @return {boolean}
   */
  get hasVideo() {
    return Boolean(this.youtubeId || this.vimeoId);
  }
  /**
   * @return {RelativeUrl}
   */
  get url() {
    return urlFromMarkdownFilename(this.markdownFilename);
  }
  get slug() {
    const filename = this.markdownFilename.split('/').slice(-1)[0];
    const trimDayAndExtension = s => s.substr(3, s.length - 6);
    return trimDayAndExtension(filename);
  }
  get urlForMonth() {
    return urlForMonthFromMarkdownFilename(this.markdownFilename);
  }
  get dateCreated() {
    return this._dateCreated || dateCreatedFromMarkdownFilename(this.markdownFilename);
  }
  set dateCreated(dateCreated) {
    this._dateCreated = dateCreated;
  }
}
