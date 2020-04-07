export class BlogPost {
  static withDateCreated(dateCreated) {
    const blogPost = new BlogPost();
    blogPost.dateCreated = dateCreated;
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
