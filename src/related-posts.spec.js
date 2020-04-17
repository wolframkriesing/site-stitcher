import {describe, it} from 'mocha';
import {assertThat, equalTo} from 'hamjest';
import {BlogPost} from './BlogPost.js';

const findRelatedPosts = (post, postsToSearchIn) => {
  return postsToSearchIn.filter(p => p !== post);
};

describe('Find related posts automatically', () => {
  it('GIVEN a post "My story #1" WHEN searching for related posts THEN find "My story #2" AND dont find itself', () => {
    const post1 = new BlogPost();
    post1.headline = 'My story #1';
    const post2 = new BlogPost();
    post1.headline = 'My story #2';
    const relatedPosts = findRelatedPosts(post1, [post1, post2]);
    assertThat(relatedPosts, equalTo([post2]));
  });
  xit('GIVEN only one post WHEN searching for related posts THEN find nothing', () => {
    const post1 = new BlogPost();
    post1.headline = 'My story #1';
    const post2 = new BlogPost();
    post1.headline = 'My story #2';
    const relatedPosts = findRelatedPosts(post1, [post2]);
    assertThat(relatedPosts, equalTo([post2]));
  });
});