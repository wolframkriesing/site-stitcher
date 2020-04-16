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

export const groupBlogPostsByYearAndMonth = (posts) => {
  const map = new Map();
  posts.forEach(post => {
    const dateParts = post.dateCreated.split('-');
    const key = dateParts.slice(0, 2).join('-');
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.set(key, [...map.get(key), post]);
  });
  const groups = [];
  const mapEntryToGroup = (blogPosts, key) => {
    const keyParts = key.split('-');
    return groups.push({
      year: Number.parseInt(keyParts[0]),
      month: Number.parseInt(keyParts[1]),
      blogPosts
    });
  }
  map.forEach(mapEntryToGroup);
  return groups;
}
