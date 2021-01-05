/**
 * @param post {Article}
 * @return {Slug[]}
 */
const tagSlugsOfPost = (post) => post.tags.map(t => t.slug);

/**
 * @param posts {Article[]}
 * @param tagSlug {Slug}
 * @return {Article[]}
 */
const postsByTag = (posts, tagSlug) => posts.filter(post => tagSlugsOfPost(post).includes(tagSlug));

/**
 * @param tagSlug {Slug}
 * @param posts {Article[]}
 * @param maxTagCount {number}
 * @return {ArticlesGroupedByTag}
 */
const blogPostsGroupedByTag = (tagSlug, posts, maxTagCount) => {
  const blogPosts = postsByTag(posts, tagSlug);
  return {
    tagSlug,
    articles: blogPosts,
    gradientWidthInPercent: (blogPosts.length / maxTagCount) * 100,
  };
};

/**
 * @param arr {string[]}
 * @return {string[]}
 */
const uniques = arr => [...new Set(arr)];

/**
 * @param group1 {ArticlesGroupedByTag}
 * @param group2 {ArticlesGroupedByTag}
 * @return {number}
 */
const byArticlesCount = (group1, group2) => group1.articles.length > group2.articles.length ? -1 : 1;

/**
 * @param a {number}
 * @param b {number}
 * @return {number}
 */
const sortByNumber = (a, b) => a - b;

/**
 * @param posts {Article[]}
 * @return {ArticlesGroupedByTag[]}
 */
export const groupArticlesByTag = (posts) => {
  const allTagsSlugs = uniques(posts.map(tagSlugsOfPost).flat());
  const maxTagCount = allTagsSlugs.map(tagSlug => postsByTag(posts, tagSlug).length).sort(sortByNumber).reverse()[0];
  return allTagsSlugs
    .map(tagSlug => blogPostsGroupedByTag(tagSlug, posts, maxTagCount))
    .sort(byArticlesCount)
  ;
};

/**
 * @param posts {Article[]}
 * @return {ArticlesGroupedByYearAndMonth[]}
 */
export const groupArticlesByYearAndMonth = (posts) => {
  /**
   * @param map {Map<YearAndMonth, Article[]>}
   * @return {function(Article): void}
   */
  const addPostToMap = map => post => {
    const [yearLength, spaceLength, monthLength] = [4, 1, 2];
    const key = post.dateCreated.substring(0, yearLength + spaceLength + monthLength);
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.set(key, [...(/** @type {Article[]} */(map.get(key))), post]);
  };

  /**
   * @param groups {ArticlesGroupedByYearAndMonth[]}
   * @param maxCount {number}
   * @return {function(Article[], YearAndMonth): void}
   */
  const addMapEntryToGroups = (groups, maxCount) => (blogPosts, key) => {
    groups.push({
      yearAndMonth: key,
      articles: blogPosts,
      gradientWidthInPercent: (blogPosts.length / maxCount) * 100,
    });
  };

  /**
   * @param group1 {ArticlesGroupedByYearAndMonth}
   * @param group2 {ArticlesGroupedByYearAndMonth}
   * @return {number}
   */
  const byYearAndMonthDesc = (group1, group2) => group1.yearAndMonth > group2.yearAndMonth ? -1 : 1;
  const mapByMonth = new Map();
  posts.forEach(addPostToMap(mapByMonth));
  const groups = /** @type {ArticlesGroupedByYearAndMonth[]} */([]);
  let maxCount = 0;
  for (let posts of mapByMonth.values()) { if (posts.length > maxCount) maxCount = posts.length; }
  mapByMonth.forEach(addMapEntryToGroups(groups, maxCount));
  return groups.sort(byYearAndMonthDesc);
}
