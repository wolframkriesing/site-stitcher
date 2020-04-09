const dateDirectoryAndFilename = markdownFilename => markdownFilename.match(/\d{4}\/\d{2}\/\d{2}-.*/)[0];
const directoryToIsoDate = s => s.split('-')[0].replace(/\//g, '-');
const dateCreatedFromMarkdownFilename = (markdownFilename) =>
  directoryToIsoDate(dateDirectoryAndFilename(markdownFilename));
const urlFromMarkdownFilename = (markdownFilename) => {
  const extensionToReplace = markdownFilename.endsWith('index.md') ? '/index.md' : '.md';
  return '/blog/' + dateDirectoryAndFilename(markdownFilename).replace(extensionToReplace, '/');
};

export class BlogPost {
  static preload(markdownFilename) {
    return new BlogPost({
      markdownFilename,
      url: urlFromMarkdownFilename(markdownFilename),
      dateCreated: dateCreatedFromMarkdownFilename(markdownFilename)
    });
  }
  constructor(attributes = {}) {
    Object.entries(attributes).forEach(([key, value]) => this[key] = value);
  }
  equals(blogPost) {
    // TODO compare properly ...
    return this.dateCreated === blogPost.dateCreated;
  }
  cloneAndOverrideWith(overrideData) {
    const clone = new BlogPost();
    // TODO clone properly, taking all props into account
    const properties = ['markdownFilename', 'url', 'dateCreated', 'headline', 'abstract'];
    properties.forEach(prop => { clone[prop] = this[prop]; });
    Object.entries(overrideData).forEach(([key, value]) => clone[key] = value);
    return clone;
  }
}
