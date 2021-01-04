import {describe, it} from '../test.js';
import {assertThat, contains, hasItem, hasItems, hasProperties, everyItem} from 'hamjest';
import {BlogPost} from './BlogPost.js';
import {groupBlogPostsByTag, groupBlogPostsByYearAndMonth} from './group-blog-posts.js';

describe('Group blog posts by tags', () => {
  const newPost = ({headline, tags}) => {
    const post = new BlogPost();
    post.headline = headline;
    post._rawTags = tags; // TODO this is not really a good idea setting the private prop, is it?
    return post;
  };
  it('GIVEN one blog post THEN return one group', () => {
    const posts = [newPost({headline: '', tags: ['js']})];
    const grouped = groupBlogPostsByTag(posts);
    assertThat(grouped, hasItem(hasProperties({tagSlug: 'js', blogPosts: posts})));
  });
  it('GIVEN two blog posts with different tags THEN return two groups', () => {
    const posts = [
      newPost({headline: '', tags: ['js']}),
      newPost({headline: '', tags: ['tdd']}),
    ];
    const grouped = groupBlogPostsByTag(posts);
    assertThat(grouped, hasItems(
      hasProperties({tagSlug: 'js', blogPosts: [posts[0]]}),
      hasProperties({tagSlug: 'tdd', blogPosts: [posts[1]]}),
    ));
  });
  it('GIVEN two blog posts with the same tags each THEN return exactly two groups with each post in it', () => {
    const posts = [
      newPost({headline: '', tags: ['js', 'tdd']}),
      newPost({headline: '', tags: ['js', 'tdd']}),
    ];
    const grouped = groupBlogPostsByTag(posts);
    assertThat(grouped, contains(
      hasProperties({tagSlug: 'js', blogPosts: posts}),
      hasProperties({tagSlug: 'tdd', blogPosts: posts}),
    ));
  });
  it('GIVEN blog posts with different tags THEN return the groups sorted by the tag counts', () => {
    const posts = [
      newPost({headline: '', tags: ['three', 'two', 'one', ]}),
      newPost({headline: '', tags: ['two', 'one', ]}),
      newPost({headline: '', tags: ['one', ]}),
    ];
    const grouped = groupBlogPostsByTag(posts);
    assertThat(grouped, contains(
      hasProperties({tagSlug: 'one', blogPosts: posts}),
      hasProperties({tagSlug: 'two', blogPosts: [posts[0], posts[1]]}),
      hasProperties({tagSlug: 'three', blogPosts: [posts[0]]}),
    ));

    describe('calculate the background-gradient-width (`gradientWidthInPercent` prop) depending on the number of posts', () => {
      it('GIVEN one tag with one post THEN set `gradientWidthInPercent=100`', () => {
        const posts = [
          newPost({tags: ['one']}),
        ];
        assertThat(groupBlogPostsByTag(posts), contains(
          hasProperties({gradientWidthInPercent: 100})
        ));
      });
      it('GIVEN two tags with one post each THEN set `gradientWidthInPercent=100` for both', () => {
        const posts = [
          newPost({tags: ['one']}),
          newPost({tags: ['two']}),
        ];
        assertThat(groupBlogPostsByTag(posts), everyItem(
          hasProperties({gradientWidthInPercent: 100})
        ));
      });
      it('GIVEN one tag used twice, the other once THEN set 100 for the first and 50 for the second', () => {
        const posts = [
          newPost({tags: ['one']}),
          newPost({tags: ['one', 'two']}),
        ];
        const grouped = groupBlogPostsByTag(posts);
        assertThat(grouped[0], hasProperties({tagSlug: 'one', gradientWidthInPercent: 100}));
        assertThat(grouped[1], hasProperties({tagSlug: 'two', gradientWidthInPercent: 50}));
      });
      it('GIVEN multiple tags, various percentages THEN set each properly', () => {
        const posts = [
          newPost({headline: 'no tags', tags: []}),
          newPost({headline: '#one', tags: ['one']}),
          newPost({headline: '#one and #two', tags: ['one', 'two']}),
          newPost({headline: '#one and #two - v2', tags: ['one', 'two']}),
          newPost({headline: '#one #two #three', tags: ['one', 'two', 'three']}),
        ];
        const grouped = groupBlogPostsByTag(posts);
        assertThat(grouped, contains(
          hasProperties({tagSlug: 'one', gradientWidthInPercent: 100}),
          hasProperties({tagSlug: 'two', gradientWidthInPercent: 75}),
          hasProperties({tagSlug: 'three', gradientWidthInPercent: 25})
        ));
      });
    });
  });
});

describe('Group blog posts by year+month', () => {
  const newPost = (dateCreated) => {
    const post = new BlogPost();
    post.headline = '';
    post.dateCreated = dateCreated;
    return post;
  };
  it('GIVEN two blog posts of the same month THEN return one group', () => {
    const posts = [
      newPost('2000-01-01'),
      newPost('2000-01-01'),
    ];
    const grouped = groupBlogPostsByYearAndMonth(posts);
    assertThat(grouped, contains(
      hasProperties({yearAndMonth: '2000-01', blogPosts: posts}),
    ));
  });
  it('GIVEN two blog posts of different months THEN return two groups', () => {
    const posts = [
      newPost('2000-01-01'),
      newPost('2001-01-01'),
    ];
    const grouped = groupBlogPostsByYearAndMonth(posts);
    assertThat(grouped, contains(
      hasProperties({yearAndMonth: '2001-01', blogPosts: [posts[1]]}),
      hasProperties({yearAndMonth: '2000-01', blogPosts: [posts[0]]}),
    ));
  });
  it('GIVEN multiple blog posts of different months THEN return grouped', () => {
    const posts = [
      newPost('2000-01-01'),
      newPost('2000-01-01'),
      newPost('2001-01-01'),
      newPost('2008-12-31'),
      newPost('2009-01-01'),
      newPost('2009-11-01'),
    ];
    const grouped = groupBlogPostsByYearAndMonth(posts);
    assertThat(grouped, contains(
      hasProperties({yearAndMonth: '2009-11', blogPosts: [posts[5]]}),
      hasProperties({yearAndMonth: '2009-01', blogPosts: [posts[4]]}),
      hasProperties({yearAndMonth: '2008-12', blogPosts: [posts[3]]}),
      hasProperties({yearAndMonth: '2001-01', blogPosts: [posts[2]]}),
      hasProperties({yearAndMonth: '2000-01', blogPosts: [posts[0], posts[1]]}),
    ));
  });
  it('GIVEN some posts WHEN grouping them THEN return them sorted chronologically reverse (newest first)', () => {
    const posts = [
      newPost('2000-01-01'),
      newPost('2000-01-01'),
      newPost('2008-12-31'),
      newPost('2009-01-01'),
      newPost('2009-11-01'),
      newPost('2001-01-01'),
    ];
    const grouped = groupBlogPostsByYearAndMonth(posts);
    assertThat(grouped, contains(
      hasProperties({yearAndMonth: '2009-11'}),
      hasProperties({yearAndMonth: '2009-01'}),
      hasProperties({yearAndMonth: '2008-12'}),
      hasProperties({yearAndMonth: '2001-01'}),
      hasProperties({yearAndMonth: '2000-01'}),
    ));
    describe('calculate the background-gradient-width (`gradientWidthInPercent` prop) depending on the number of posts', () => {
      it('GIVEN multiple tags, various percentages THEN set each properly', () => {
        const posts = [
          newPost('2000-01-01'),
          newPost('2000-01-01'),
          newPost('2008-12-31'),
          newPost('2009-01-01'),
        ];
        const grouped = groupBlogPostsByYearAndMonth(posts);
        assertThat(grouped, contains(
          hasProperties({yearAndMonth: '2009-01', gradientWidthInPercent: 50}),
          hasProperties({yearAndMonth: '2008-12', gradientWidthInPercent: 50}),
          hasProperties({yearAndMonth: '2000-01', gradientWidthInPercent: 100}),
        ));
      });
    });
  });
});
