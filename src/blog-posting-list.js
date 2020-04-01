export class BlogPosting {
  static withDateCreated(dateCreated) {
    const blogPosting = new BlogPosting();
    blogPosting.dateCreated = dateCreated;
    return blogPosting;
  }
  constructor(attributes = {}) {
    Object.entries(attributes).forEach(([key, value]) => this[key] = value);
  }
  equals(blogPosting) {
    return this.dateCreated === blogPosting.dateCreated;
  }
}

export const buildBlogPostingListFromFiles = files => {
  return files.map(file => {
    const date = file.split('-')[0].replace(/\//g, '-');
    return BlogPosting.withDateCreated(date);
  });
};
