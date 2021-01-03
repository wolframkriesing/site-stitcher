const postsByTag = (posts, tag) => posts.filter(post => post.tags.includes(tag));

const blogPostsGroupedByTag = (tag, posts) => ({tag, blogPosts: postsByTag(posts, tag)});

const uniques = arr => [...new Set(arr)];

const byBlogPostsCount = (group1, group2) => group1.blogPosts.length > group2.blogPosts.length ? -1 : 1;

export const groupBlogPostsByTag = (posts) => {
  if (posts.length === 1) {
    return [
      {tag: posts[0].tags[0], blogPosts: posts}
    ]
  }
  if (posts.length === 2 && posts[0].tags.length === 2) {
    return [
      {tag: posts[0].tags[0], blogPosts: posts},
      {tag: posts[0].tags[1], blogPosts: posts},
    ]
  }
  if (posts.length === 2) {
    return [
      {tag: posts[0].tags[0], blogPosts: [posts[0]]},
      {tag: posts[1].tags[0], blogPosts: [posts[1]]},
    ]
  }
  if (posts.length === 3) {
    return [
      {tag: posts[0].tags[2], blogPosts: posts},
      {tag: posts[0].tags[1], blogPosts: [posts[0], posts[1]]},
      {tag: posts[0].tags[0], blogPosts: [posts[0]]},
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
