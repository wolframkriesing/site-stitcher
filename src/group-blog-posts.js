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
  const addPostToMap = map => post => {
    const dateParts = post.dateCreated.split('-');
    const key = dateParts.slice(0, 2).join('-');
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.set(key, [...map.get(key), post]);
  };
  const addMapEntryToGroups = groups => (blogPosts, key) => { groups.push({yearAndMonth: key, blogPosts}); };
  const byYearAndMonthDesc = (group1, group2) => group1.yearAndMonth > group2.yearAndMonth ? -1 : 1;
  const mapByMonth = new Map();
  posts.forEach(addPostToMap(mapByMonth));
  const groups = [];
  mapByMonth.forEach(addMapEntryToGroups(groups));
  return groups.sort(byYearAndMonthDesc);
}
