import {describe, it} from 'mocha';
import {assertThat, hasItem, hasItems, hasProperties} from 'hamjest';
import {BlogPost} from './BlogPost.js';
import {groupBlogPostsByTag} from './group-blog-posts-by-tags.js';

describe('Group blog posts by tags', () => {
  const newPost = ({headline, tags}) => {
    const post = new BlogPost();
    post.headline = headline;
    post.tags = tags;
    return post;
  };
  it('GIVEN one blog post THEN return one group', () => {
    const posts = [newPost({headline: '', tags: ['js']})];
    const grouped = groupBlogPostsByTag(posts);
    assertThat(grouped, hasItem(hasProperties({tag: 'js', blogPosts: posts})));
  });
  it('GIVEN two blog posts with different tags THEN return two groups', () => {
    const posts = [
      newPost({headline: '', tags: ['js']}),
      newPost({headline: '', tags: ['tdd']}),
    ];
    const grouped = groupBlogPostsByTag(posts);
    assertThat(grouped, hasItems(
      hasProperties({tag: 'js', blogPosts: [posts[0]]}),
      hasProperties({tag: 'tdd', blogPosts: [posts[1]]}),
    ));
  });
  it('GIVEN two blog posts with the same tags each THEN return two groups with each post in it', () => {
    const posts = [
      newPost({headline: '', tags: ['js', 'tdd']}),
      newPost({headline: '', tags: ['js', 'tdd']}),
    ];
    const grouped = groupBlogPostsByTag(posts);
    assertThat(grouped, hasItems(
      hasProperties({tag: 'js', blogPosts: posts}),
      hasProperties({tag: 'tdd', blogPosts: posts}),
    ));
  });
});
