import {describe, it} from 'mocha';
import {assertThat, equalTo} from 'hamjest';
import {BlogPost} from './BlogPost.js';
import {findRelatedPosts} from './related-posts.js';

describe('Find posts related by their headline, automatically', () => {
  const newPost = (headline) => {
    const post = new BlogPost();
    post.headline = headline;
    return post;
  }
  it('GIVEN a post "My story #1" WHEN searching for related posts THEN find "My story #2" AND dont find itself', () => {
    const post1 = newPost('My story #1');
    const post2 = newPost('My story #2');
    const relatedPosts = findRelatedPosts(post1, [post1, post2]);
    assertThat(relatedPosts, equalTo([post2]));
  });
  it('GIVEN multiple related posts WHEN searching for related posts THEN find all where the first two words are the same', () => {
    const posts = [
      newPost('Bookmarks collect, October 2015'),
      newPost('Bookmarks collect, December 2020'),
      newPost('Nothing related'),
      newPost('Bookmarks collect, October 2015 #2'),
      newPost('Also unrelated'),
      newPost('Bookmarks collect, January 2001'),
    ];
    const relatedPosts = findRelatedPosts(posts[0], posts);
    assertThat(relatedPosts, equalTo([posts[1], posts[3], posts[5],]));
  });
  it('GIVEN unrelated posts WHEN searching for related posts THEN find nothing', () => {
    const post1 = newPost('About JavaScript');
    const post2 = newPost('How to fly');
    const relatedPosts = findRelatedPosts(post1, [post2]);
    assertThat(relatedPosts, equalTo([]));
  });
});