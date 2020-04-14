import {describe, it} from 'mocha';
import assert from 'assert';
import {assertThat, hasItem, hasProperties} from 'hamjest';
import {BlogPost} from './BlogPost.js';

const groupBlogPostsByTag = (posts) => {
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
});
