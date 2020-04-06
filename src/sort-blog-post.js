export const sortBlogPostListByDateCreated = blogPostList =>
  blogPostList.sort((p1, p2) => p1.dateCreated < p2.dateCreated ? -1 : 1);
