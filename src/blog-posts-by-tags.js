const postsByTag = (posts, tag) => posts.filter(post => post.tags.includes(tag));
const blogPostsGroupedByTag = (tag, posts) => ({tag, blogPosts: postsByTag(posts, tag)});
export const groupBlogPostsByTag = (posts) => {
  const allTags = posts.map(post => post.tags).flat();
  return allTags.map(tag => blogPostsGroupedByTag(tag, posts));
};
