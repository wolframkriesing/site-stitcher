const dateDirectoryAndFilename = markdownFilename => markdownFilename.match(/\d{4}\/\d{2}\/\d{2}-.*/)[0];
const directoryToIsoDate = s => s.split('-')[0].replace(/\//g, '-');
const dateCreatedFromMarkdownFilename = (markdownFilename) =>
  directoryToIsoDate(dateDirectoryAndFilename(markdownFilename));

export class BlogPost {
  static withMarkdownFilename(markdownFilename) {
    return new BlogPost({markdownFilename});
  }
  constructor(attributes = {}) {
    Object.entries(attributes).forEach(([key, value]) => this[key] = value);
    this.url = '/blog/' + dateDirectoryAndFilename(this.markdownFilename).replace('.md', '/');
    this.dateCreated = dateCreatedFromMarkdownFilename(this.markdownFilename);
  }
  equals(blogPost) {
    return this.dateCreated === blogPost.dateCreated;
  }
}
