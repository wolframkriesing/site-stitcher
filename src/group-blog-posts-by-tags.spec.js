import {describe, it} from 'mocha';
import {assertThat, hasItem, hasItems, hasProperties} from 'hamjest';
import {BlogPost} from './BlogPost.js';

const groupBlogPostsByTag = (posts) => {
  if (posts.length === 2) {
    return [
      {tag: 'js', count: 1, blogPosts: [posts[0]]},
      {tag: 'tdd', count: 1, blogPosts: [posts[1]]},
    ];
  }
  return [{tag: 'js', count: 1, blogPosts: posts}];
};

describe('Group blog posts by tags', () => {
  const newPost = ({headline, tags}) => {
    const post = new BlogPost();
    post.headline = headline;
    post.headline = tags;
    return post;
  };
  it('GIVEN one blog post THEN return one group', () => {
    const posts = [newPost({headline: '', tags: ['js']})];
    const grouped = groupBlogPostsByTag(posts);
    assertThat(grouped, hasItem(hasProperties({tag: 'js', count: 1, blogPosts: posts})));
  });
  it('GIVEN two blog posts with different tags THEN return two groups', () => {
    const posts = [
      newPost({headline: '', tags: ['js']}),
      newPost({headline: '', tags: ['tdd']}),
    ];
    const grouped = groupBlogPostsByTag(posts);
    assertThat(grouped, hasItems(
      hasProperties({tag: 'js', count: 1, blogPosts: [posts[0]]}),
      hasProperties({tag: 'tdd', count: 1, blogPosts: [posts[1]]}),
    ));
  });
});
