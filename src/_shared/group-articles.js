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
const articlesByTag = (posts, tagSlug) => posts.filter(post => tagSlugsOfPost(post).includes(tagSlug));

/**
 * @param tagSlug {Slug}
 * @param articles {Article[]}
 * @param urlPrefix {string}
 * @param maxTagCount {number}
 * @return {ArticlesGroupedByTag}
 */
const articlesGroupedByTag = (tagSlug, articles, urlPrefix, maxTagCount) => {
  const filteredArticles = articlesByTag(articles, tagSlug);
  return {
    tagSlug,
    articles: filteredArticles,
    gradientWidthInPercent: (filteredArticles.length / maxTagCount) * 100,
    url: `${urlPrefix}/${tagSlug}/`,
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
 * @param urlPrefix {string}
 * @return {ArticlesGroupedByTag[]}
 */
export const groupArticlesByTag = (posts, urlPrefix) => {
  const allTagsSlugs = uniques(posts.map(tagSlugsOfPost).flat());
  const maxTagCount = allTagsSlugs.map(tagSlug => articlesByTag(posts, tagSlug).length).sort(sortByNumber).reverse()[0];
  return allTagsSlugs
    .map(tagSlug => articlesGroupedByTag(tagSlug, posts, urlPrefix, maxTagCount))
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
  const addMapEntryToGroups = (groups, maxCount) => (articles, key) => {
    groups.push({
      yearAndMonth: key,
      articles,
      gradientWidthInPercent: (articles.length / maxCount) * 100,
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
