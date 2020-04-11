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

export class BlogPost {
  /**
   * @param {Filename} markdownFilename
   * @return {BlogPost}
   */
  static preload(markdownFilename) {
    const blogPost = new BlogPost();
    blogPost.markdownFilename = markdownFilename; // deprecate this one, and then move it to BlogPostSourceFile
    blogPost.filename = markdownFilename;
    return blogPost;
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
  get dateCreated() {
    return this._dateCreated || dateCreatedFromMarkdownFilename(this.markdownFilename);
  }
  set dateCreated(dateCreated) {
    this._dateCreated = dateCreated;
  }
  equals(blogPost) {
    // TODO compare properly ... or delete this method
    return this.dateCreated === blogPost.dateCreated;
  }

  /**
   * @param {object} overrideData
   * @return {BlogPost}
   */
  cloneAndOverrideWith(overrideData) {
    const clone = new BlogPost();
    clone.markdownFilename = this.markdownFilename;
    Object.entries(overrideData).forEach(([key, value]) => clone[key] = value);
    return clone;
  }
  static withSourceFile(blogPostSourceFile, rawBlogPostData) {
    const post = new BlogPost();
    post.markdownFilename = blogPostSourceFile.filename;
    Object.entries(rawBlogPostData).forEach(([key, value]) => post[key] = value);
    return post;
  }
}
