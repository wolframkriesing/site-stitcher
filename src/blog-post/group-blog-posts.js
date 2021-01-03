const tagSlugsOfPost = (post) => post.tags.map(t => t.slug);

const postsByTag = (posts, tagSlug) => posts.filter(post => tagSlugsOfPost(post).includes(tagSlug));

const blogPostsGroupedByTag = (tagSlug, posts) => ({tagSlug, blogPosts: postsByTag(posts, tagSlug)});

const uniques = arr => [...new Set(arr)];

const byBlogPostsCount = (group1, group2) => group1.blogPosts.length > group2.blogPosts.length ? -1 : 1;

export const groupBlogPostsByTag = (posts) => {
  const allTagsSlugs = uniques(posts.map(tagSlugsOfPost).flat());
  return allTagsSlugs
    .map(tagSlug => blogPostsGroupedByTag(tagSlug, posts))
    .sort(byBlogPostsCount)
  ;
};

export const groupBlogPostsByYearAndMonth = (posts) => {
  const addPostToMap = map => post => {
    const [yearLength, spaceLength, monthLength] = [4, 1, 2];
    const key = post.dateCreated.substring(0, yearLength + spaceLength + monthLength);
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
