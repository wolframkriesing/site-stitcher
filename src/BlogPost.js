const dateDirectoryAndFilename = markdownFilename => markdownFilename.match(/\d{4}\/\d{2}\/\d{2}-.*/)[0];
const directoryToIsoDate = s => s.split('-')[0].replace(/\//g, '-');
const dateCreatedFromMarkdownFilename = (markdownFilename) =>
  directoryToIsoDate(dateDirectoryAndFilename(markdownFilename));
const urlFromMarkdownFilename = (markdownFilename) => {
  const extensionToReplace = markdownFilename.endsWith('index.md') ? '/index.md' : '.md';
  return '/blog/' + dateDirectoryAndFilename(markdownFilename).replace(extensionToReplace, '/');
};

export class BlogPost {
  static withMarkdownFilename(markdownFilename) {
    return new BlogPost({markdownFilename});
  }
  constructor(attributes = {}) {
    Object.entries(attributes).forEach(([key, value]) => this[key] = value);
// TODO calculating things here makes attribute `markdownFilename` a required attribute ... IMPROVE this
    this.url = urlFromMarkdownFilename(this.markdownFilename);
    this.dateCreated = dateCreatedFromMarkdownFilename(this.markdownFilename);
  }
  equals(blogPost) {
    return this.dateCreated === blogPost.dateCreated;
  }
  cloneAndOverrideWith(overrideData) {
    const markdownFilename = this.markdownFilename;
    const clone = new BlogPost({markdownFilename});
    Object.entries(overrideData).forEach(([key, value]) => clone[key] = value);
    return clone;
  }
}
