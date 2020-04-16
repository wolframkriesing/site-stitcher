const postsByTag = (posts, tag) => posts.filter(post => post.tags.includes(tag));
const blogPostsGroupedByTag = (tag, posts) => ({tag, blogPosts: postsByTag(posts, tag)});
const uniques = arr => [...new Set(arr)];
const byBlogPostsCount = (group1, group2) => group1.blogPosts.length > group2.blogPosts.length ? -1 : 1;
export const groupBlogPostsByTag = (posts) => {
  const allTags = uniques(posts.map(post => post.tags).flat());
  return allTags
    .map(tag => blogPostsGroupedByTag(tag, posts))
    .sort(byBlogPostsCount)
  ;
};
