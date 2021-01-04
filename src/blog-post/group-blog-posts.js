/**
 * @typedef {import('./BlogPost').BlogPost} BlogPost
 * @typedef {import('./types').BlogPostsByTag} BlogPostsByTag
 * @typedef {import('./types').BlogPostsByYearAndMonth} BlogPostsByYearAndMonth
 * @typedef {import('./types').YearAndMonth} YearAndMonth
 */

/**
 * @param post {BlogPost}
 * @return {Slug[]}
 */
const tagSlugsOfPost = (post) => post.tags.map(t => t.slug);

/**
 * @param posts {BlogPost[]}
 * @param tagSlug {Slug}
 * @return {BlogPost[]}
 */
const postsByTag = (posts, tagSlug) => posts.filter(post => tagSlugsOfPost(post).includes(tagSlug));

/**
 * @param tagSlug {Slug}
 * @param posts {BlogPost[]}
 * @return {BlogPostsByTag}
 */
const blogPostsGroupedByTag = (tagSlug, posts) => {
  return {
    tagSlug,
    blogPosts: postsByTag(posts, tagSlug),
    gradientWidthInPercent: 100,
  };
};

/**
 * @param arr {string[]}
 * @return {string[]}
 */
const uniques = arr => [...new Set(arr)];

/**
 * @param group1 {BlogPostsByTag}
 * @param group2 {BlogPostsByTag}
 * @return {number}
 */
const byBlogPostsCount = (group1, group2) => group1.blogPosts.length > group2.blogPosts.length ? -1 : 1;

/**
 * @param posts {BlogPost[]}
 * @return {BlogPostsByTag[]}
 */
export const groupBlogPostsByTag = (posts) => {
  const allTagsSlugs = uniques(posts.map(tagSlugsOfPost).flat());
  return allTagsSlugs
    .map(tagSlug => blogPostsGroupedByTag(tagSlug, posts))
    .sort(byBlogPostsCount)
  ;
};

/**
 * @param posts {BlogPost[]}
 * @return {BlogPostsByYearAndMonth[]}
 */
export const groupBlogPostsByYearAndMonth = (posts) => {
  /**
   * @param map {Map<YearAndMonth, BlogPost[]>}
   * @return {function(BlogPost): void}
   */
  const addPostToMap = map => post => {
    const [yearLength, spaceLength, monthLength] = [4, 1, 2];
    const key = post.dateCreated.substring(0, yearLength + spaceLength + monthLength);
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.set(key, [...(/** @type {BlogPost[]} */(map.get(key))), post]);
  };

  /**
   * @param groups {BlogPostsByYearAndMonth[]}
   * @return {function(BlogPost[], YearAndMonth): void}
   */
  const addMapEntryToGroups = groups => (blogPosts, key) => { groups.push({yearAndMonth: key, blogPosts}); };

  /**
   * @param group1 {BlogPostsByYearAndMonth}
   * @param group2 {BlogPostsByYearAndMonth}
   * @return {number}
   */
  const byYearAndMonthDesc = (group1, group2) => group1.yearAndMonth > group2.yearAndMonth ? -1 : 1;
  const mapByMonth = new Map();
  posts.forEach(addPostToMap(mapByMonth));
  const groups = /** @type {BlogPostsByYearAndMonth[]} */([]);
  mapByMonth.forEach(addMapEntryToGroups(groups));
  return groups.sort(byYearAndMonthDesc);
}
