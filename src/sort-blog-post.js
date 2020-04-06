const sortByDateCreatedAsc = (p1, p2) => p1.dateCreated < p2.dateCreated ? -1 : 1;

export const sortBlogPostListByDateCreated = blogPostList =>
  blogPostList.sort(sortByDateCreatedAsc);
