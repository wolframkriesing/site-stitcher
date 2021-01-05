import {describe, it} from '../test.js';
import {assertThat, contains, hasItem, hasItems, hasProperties, everyItem} from 'hamjest';
import {BlogPost} from '../blog-post/BlogPost.js';
import {groupArticlesByTag, groupArticlesByYearAndMonth} from './group-articles.js';

/**
 * @param articles {Article[]}
 * @param urlPrefix? {string}
 * @return {ArticlesGroupedByTag[]}
 */
const groupByTag = (articles, urlPrefix = '/irrelevant') => groupArticlesByTag(articles, urlPrefix);

describe('Group articles by tags', () => {
  /**
   * @param {{headline?: string, tags: string[]}} props
   * @return {BlogPost}
   */
  const newArticle = ({headline = '', tags}) => {
    const article = new BlogPost();
    article.headline = headline;
    article._rawTags = tags; // TODO this is not really a good idea setting the private prop, is it?
    return article;
  };
  describe('GIVEN one article', () => {
    it('THEN return one group', () => {
      const articles = [newArticle({headline: '', tags: ['js']})];
      const grouped = groupByTag(articles);
      assertThat(grouped, hasItem(hasProperties({tagSlug: 'js', articles})));
    });
    it('THEN the group has a `url` prop built with the prefix and the tag', () => {
      const articles = [newArticle({headline: '', tags: ['js']})];
      const grouped = groupByTag(articles, '/url/prefix');
      assertThat(grouped, hasItem(hasProperties({url: '/url/prefix/js/'})));
    });
  });
  it('GIVEN two articles with different tags THEN return two groups', () => {
    const articles = [
      newArticle({headline: '', tags: ['js']}),
      newArticle({headline: '', tags: ['tdd']}),
    ];
    const grouped = groupByTag(articles);
    assertThat(grouped, hasItems(
      hasProperties({tagSlug: 'js', articles: [articles[0]]}),
      hasProperties({tagSlug: 'tdd', articles: [articles[1]]}),
    ));
  });
  it('GIVEN two articles with the same tags each THEN return exactly two groups with each post in it', () => {
    const articles = [
      newArticle({headline: '', tags: ['js', 'tdd']}),
      newArticle({headline: '', tags: ['js', 'tdd']}),
    ];
    const grouped = groupByTag(articles);
    assertThat(grouped, contains(
      hasProperties({tagSlug: 'js', articles}),
      hasProperties({tagSlug: 'tdd', articles}),
    ));
  });
  it('GIVEN articles with different tags THEN return the groups sorted by the tag counts', () => {
    const articles = [
      newArticle({headline: '', tags: ['three', 'two', 'one', ]}),
      newArticle({headline: '', tags: ['two', 'one', ]}),
      newArticle({headline: '', tags: ['one', ]}),
    ];
    const grouped = groupByTag(articles);
    assertThat(grouped, contains(
      hasProperties({tagSlug: 'one', articles}),
      hasProperties({tagSlug: 'two', articles: [articles[0], articles[1]]}),
      hasProperties({tagSlug: 'three', articles: [articles[0]]}),
    ));

    describe('calculate the background-gradient-width (`gradientWidthInPercent` prop) depending on the number of articles', () => {
      it('GIVEN one tag with one post THEN set `gradientWidthInPercent=100`', () => {
        const articles = [
          newArticle({tags: ['one']}),
        ];
        assertThat(groupByTag(articles), contains(
          hasProperties({gradientWidthInPercent: 100})
        ));
      });
      it('GIVEN two tags with one post each THEN set `gradientWidthInPercent=100` for both', () => {
        const articles = [
          newArticle({tags: ['one']}),
          newArticle({tags: ['two']}),
        ];
        assertThat(groupByTag(articles), everyItem(
          hasProperties({gradientWidthInPercent: 100})
        ));
      });
      it('GIVEN one tag used twice, the other once THEN set 100 for the first and 50 for the second', () => {
        const articles = [
          newArticle({tags: ['one']}),
          newArticle({tags: ['one', 'two']}),
        ];
        const grouped = groupByTag(articles);
        assertThat(grouped[0], hasProperties({tagSlug: 'one', gradientWidthInPercent: 100}));
        assertThat(grouped[1], hasProperties({tagSlug: 'two', gradientWidthInPercent: 50}));
      });
      it('GIVEN multiple tags, various percentages THEN set each properly', () => {
        const articles = [
          newArticle({headline: 'no tags', tags: []}),
          newArticle({headline: '#one', tags: ['one']}),
          newArticle({headline: '#one and #two', tags: ['one', 'two']}),
          newArticle({headline: '#one and #two - v2', tags: ['one', 'two']}),
          newArticle({headline: '#one #two #three', tags: ['one', 'two', 'three']}),
        ];
        const grouped = groupByTag(articles);
        assertThat(grouped, contains(
          hasProperties({tagSlug: 'one', gradientWidthInPercent: 100}),
          hasProperties({tagSlug: 'two', gradientWidthInPercent: 75}),
          hasProperties({tagSlug: 'three', gradientWidthInPercent: 25})
        ));
      });
      it('GIVEN many tags THEN sort correctly also for big numbers', () => {
        const articles = [
          newArticle({tags: ['one', ]}),
          newArticle({tags: ['one', ]}),
          newArticle({tags: ['one', ]}),
          newArticle({tags: ['one', ]}),
          newArticle({tags: ['one', ]}),
          newArticle({tags: ['one', ]}),
          newArticle({tags: ['one', ]}),
          newArticle({tags: ['one', ]}),
          newArticle({tags: ['one', 'two']}),
          newArticle({tags: ['one', 'two']}),
        ];
        const grouped = groupByTag(articles);
        assertThat(grouped[0], hasProperties({tagSlug: 'one', gradientWidthInPercent: 100}));
        assertThat(grouped[1], hasProperties({tagSlug: 'two', gradientWidthInPercent: 20}));
      });
    });
  });
});

/**
 * @param articles {Article[]}
 * @param urlPrefix? {string}
 * @return {ArticlesGroupedByYearAndMonth[]}
 */
const groupByYearAndMonth = (articles, urlPrefix = '/irrelevant') =>
  groupArticlesByYearAndMonth(articles, urlPrefix);

describe('Group articles by year+month', () => {
  /**
   * @param dateCreated {DateString}
   * @return {BlogPost}
   */
  const newArticle = (dateCreated) => {
    const post = new BlogPost();
    post.headline = '';
    post.dateCreated = dateCreated;
    return post;
  };
  it('GIVEN two articles of the same month THEN return one group', () => {
    const articles = [
      newArticle('2000-01-01'),
      newArticle('2000-01-01'),
    ];
    const grouped = groupByYearAndMonth(articles);
    assertThat(grouped, contains(
      hasProperties({yearAndMonth: '2000-01', articles}),
    ));
  });
  it('GIVEN two articles of different months THEN return two groups', () => {
    const articles = [
      newArticle('2000-01-01'),
      newArticle('2001-01-01'),
    ];
    const grouped = groupByYearAndMonth(articles);
    assertThat(grouped, contains(
      hasProperties({yearAndMonth: '2001-01', articles: [articles[1]]}),
      hasProperties({yearAndMonth: '2000-01', articles: [articles[0]]}),
    ));
  });
  it('GIVEN an article THEN each group has the correct `url`', () => {
    const articles = [
      newArticle('2000-01-01'),
    ];
    const grouped = groupByYearAndMonth(articles, '/url/prefix');
    assertThat(grouped, contains(hasProperties({url: '/url/prefix/2000/01/'})));
  });
  it('GIVEN multiple articles of different months THEN return grouped', () => {
    const articles = [
      newArticle('2000-01-01'),
      newArticle('2000-01-01'),
      newArticle('2001-01-01'),
      newArticle('2008-12-31'),
      newArticle('2009-01-01'),
      newArticle('2009-11-01'),
    ];
    const grouped = groupByYearAndMonth(articles);
    assertThat(grouped, contains(
      hasProperties({yearAndMonth: '2009-11', articles: [articles[5]]}),
      hasProperties({yearAndMonth: '2009-01', articles: [articles[4]]}),
      hasProperties({yearAndMonth: '2008-12', articles: [articles[3]]}),
      hasProperties({yearAndMonth: '2001-01', articles: [articles[2]]}),
      hasProperties({yearAndMonth: '2000-01', articles: [articles[0], articles[1]]}),
    ));
  });
  it('GIVEN some articles WHEN grouping them THEN return them sorted chronologically reverse (newest first)', () => {
    const articles = [
      newArticle('2000-01-01'),
      newArticle('2000-01-01'),
      newArticle('2008-12-31'),
      newArticle('2009-01-01'),
      newArticle('2009-11-01'),
      newArticle('2001-01-01'),
    ];
    const grouped = groupByYearAndMonth(articles);
    assertThat(grouped, contains(
      hasProperties({yearAndMonth: '2009-11'}),
      hasProperties({yearAndMonth: '2009-01'}),
      hasProperties({yearAndMonth: '2008-12'}),
      hasProperties({yearAndMonth: '2001-01'}),
      hasProperties({yearAndMonth: '2000-01'}),
    ));
    describe('calculate the background-gradient-width (`gradientWidthInPercent` prop) depending on the number of articles', () => {
      it('GIVEN multiple articles per month, various percentages THEN set each properly', () => {
        const articles = [
          newArticle('2000-01-01'),
          newArticle('2000-01-01'),
          newArticle('2008-12-31'),
          newArticle('2009-01-01'),
        ];
        const grouped = groupByYearAndMonth(articles);
        assertThat(grouped, contains(
          hasProperties({yearAndMonth: '2009-01', gradientWidthInPercent: 50}),
          hasProperties({yearAndMonth: '2008-12', gradientWidthInPercent: 50}),
          hasProperties({yearAndMonth: '2000-01', gradientWidthInPercent: 100}),
        ));
      });
      it('GIVEN many articles THEN sort correctly also for big numbers', () => {
        const articles = [
          newArticle('2000-01-01'),
          newArticle('2000-01-01'),
          newArticle('2000-01-01'),
          newArticle('2000-01-01'),
          newArticle('2000-01-01'),

          newArticle('2000-01-01'),
          newArticle('2000-01-01'),
          newArticle('2000-01-01'),
          newArticle('2000-01-01'),
          newArticle('2000-01-01'),

          newArticle('2009-01-01'),
          newArticle('2009-01-01'),
        ];
        const grouped = groupByYearAndMonth(articles);
        assertThat(grouped, contains(
          hasProperties({yearAndMonth: '2009-01', gradientWidthInPercent: 20}),
          hasProperties({yearAndMonth: '2000-01', gradientWidthInPercent: 100}),
        ));
      });
    });
  });
});
