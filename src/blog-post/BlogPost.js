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
  /**
   * @param blogPostSourceFile {BlogPostSourceFile}
   * @param rawBlogPostData {RawBlogPost}
   * @return {BlogPost}
   */
  static withSourceFile(blogPostSourceFile, rawBlogPostData) {
    const post = new BlogPost();
    post.markdownFilename = blogPostSourceFile.filename; // should this become a BlogPostSourceFile instance?
    post._rawTags = rawBlogPostData.tags;

    post.abstract = rawBlogPostData.abstract;
    post.abstractAsHtml = rawBlogPostData.abstractAsHtml;
    post.bodyAsHtml = rawBlogPostData.bodyAsHtml;
    post.canonicalHint = rawBlogPostData.canonicalHint;
    post.canonicalUrl = rawBlogPostData.canonicalUrl;
    post.dateCreated = rawBlogPostData.dateCreated;
    post.headline = rawBlogPostData.headline;
    post.headlineAsHtml = rawBlogPostData.headlineAsHtml;
    post.isDraft = rawBlogPostData.isDraft;
    post.oldUrls = rawBlogPostData.oldUrls;
    post.previewImage = rawBlogPostData.previewImage;
    post.vimeoId = rawBlogPostData.vimeoId;
    post.videoStartTime = rawBlogPostData.videoStartTime;
    post.youtubeId = rawBlogPostData.youtubeId;
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
  get previewImageUrl() {
    return this.url + this.previewImage;
  }
  get slug() {
    const trimDay = s => s.substr(3);
    const trimExtension = s => s.replace(/.md$/, '');
    if (this.markdownFilename.endsWith('index.md')) {
      return trimDay(this.markdownFilename.split('/').slice(-2)[0]);
    }
    const filename = this.markdownFilename.split('/').slice(-1)[0];
    return trimExtension(trimDay(filename));
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
  get tags() {
    return this._rawTags.map(t => ({value: t}));
  }
}
