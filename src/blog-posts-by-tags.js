const postsByTag = (posts, tag) => posts.filter(post => post.tags.includes(tag));
const blogPostsGroupedByTag = (tag, posts) => ({tag, blogPosts: postsByTag(posts, tag)});
const uniques = arr => [...new Set(arr)];
export const groupBlogPostsByTag = (posts) => {
  const allTags = uniques(posts.map(post => post.tags).flat());
  return allTags.map(tag => blogPostsGroupedByTag(tag, posts));
};
