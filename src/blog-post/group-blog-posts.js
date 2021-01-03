const postsByTag = (posts, tagSlug) => posts.filter(post => post.tags.map(t => t.slug).includes(tagSlug));

const blogPostsGroupedByTag = (tagSlug, posts) => ({tagSlug, blogPosts: postsByTag(posts, tagSlug)});

const uniques = arr => [...new Set(arr)];

const byBlogPostsCount = (group1, group2) => group1.blogPosts.length > group2.blogPosts.length ? -1 : 1;

export const groupBlogPostsByTag = (posts) => {
  if (posts.length === 1) {
    const allTagsSlugs = uniques(posts.map(post => post.tags.map(t => t.slug)).flat());
    return allTagsSlugs
      .map(tagSlug => blogPostsGroupedByTag(tagSlug, posts))
      .sort(byBlogPostsCount)
    ;
  }
  if (posts.length === 2 && posts[0].tags.length === 2) {
    return [
      {tagSlug: posts[0].tags[0].slug, blogPosts: posts},
      {tagSlug: posts[0].tags[1].slug, blogPosts: posts},
    ]
  }
  if (posts.length === 2) {
    return [
      {tagSlug: posts[0].tags[0].slug, blogPosts: [posts[0]]},
      {tagSlug: posts[1].tags[0].slug, blogPosts: [posts[1]]},
    ]
  }
  if (posts.length === 3) {
    return [
      {tagSlug: posts[0].tags[2].slug, blogPosts: posts},
      {tagSlug: posts[0].tags[1].slug, blogPosts: [posts[0], posts[1]]},
      {tagSlug: posts[0].tags[0].slug, blogPosts: [posts[0]]},
    ]
  }

  const allTags = uniques(posts.map(post => post.tags).flat());
  return allTags
    .map(tag => blogPostsGroupedByTag(tag, posts))
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
