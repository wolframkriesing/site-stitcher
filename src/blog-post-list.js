export class BlogPost {
  static withDateCreated(dateCreated) {
    const blogPost = new BlogPost();
    blogPost.dateCreated = dateCreated;
    return blogPost;
  }
  constructor(attributes = {}) {
    Object.entries(attributes).forEach(([key, value]) => this[key] = value);
  }
  equals(blogPost) {
    return this.dateCreated === blogPost.dateCreated;
  }
}

export const buildBlogPostListFromFiles = files => {
  return files.map(file => {
    const date = file.split('-')[0].replace(/\//g, '-');
    return BlogPost.withDateCreated(date);
  });
};

export const loadBlogPostList = ({loadBlogPostingFromFile}) => async blogPostingList => {
  const rawPosts = await Promise.all(blogPostingList.map(async () => await loadBlogPostingFromFile(/* TODO pass the date */)));

  return rawPosts.map((rawPostData, index) => {
    return new BlogPost({
      dateCreated: blogPostingList[index].dateCreated,
      ...rawPostData
    });
  });
};

