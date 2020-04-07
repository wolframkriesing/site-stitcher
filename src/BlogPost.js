export class BlogPost {
  static withDateCreated(dateCreated) {
    const blogPost = new BlogPost();
    blogPost.dateCreated = dateCreated;
    return blogPost;
  }
  static withMarkdownFilename(markdownFilename) {
    const blogPost = new BlogPost();
    const dateFolderAndFilename = markdownFilename.match(/\d{4}\/\d{2}\/\d{2}-.*/)[0];
    const toIsoDate = s => s.split('-')[0].replace(/\//g, '-');
    blogPost.dateCreated = toIsoDate(dateFolderAndFilename);
    blogPost.markdownFilename = markdownFilename;
    return blogPost;
  }
  constructor(attributes = {}) {
    Object.entries(attributes).forEach(([key, value]) => this[key] = value);
    this.url = '/blog/2018/05/13-post/';
  }
  equals(blogPost) {
    return this.dateCreated === blogPost.dateCreated;
  }
}
