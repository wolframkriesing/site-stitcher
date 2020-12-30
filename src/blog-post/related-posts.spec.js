import {describe, it} from '../test.js';
import {assertThat, equalTo} from 'hamjest';
import {BlogPost} from './BlogPost.js';
import {findRelatedPosts} from './related-posts.js';

describe('Find posts related by their headline, automatically', () => {
  const newPost = (headline) => {
    const post = new BlogPost();
    post.headline = headline;
    return post;
  }
  it('GIVEN a post "My story #1" WHEN searching for related posts THEN find "My story #2" AND case insensitive', () => {
    const post1 = newPost('My story #1');
    const post2 = newPost('MY STORY #2');
    const relatedPosts = findRelatedPosts(post1, [post1, post2]);
    assertThat(relatedPosts, equalTo([post1, post2]));
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
    assertThat(relatedPosts, equalTo([posts[0], posts[1], posts[3], posts[5],]));
  });
  it('GIVEN a comma after the 2nd word WHEN searching for related posts THEN ignore the comma', () => {
    const posts = [
      newPost('Bookmarks collect, October 2015'),
      newPost('Bookmarks collect December 2020'),
    ];
    const relatedPosts = findRelatedPosts(posts[0], posts);
    assertThat(relatedPosts, equalTo([posts[0], posts[1],]));
  });
  it('GIVEN only one word matches WHEN searching for related posts THEN match on one word AND case insensitive', () => {
    const posts = [
      newPost('Newsletter #1'),
      newPost('NewslettER #2'),
    ];
    const relatedPosts = findRelatedPosts(posts[0], posts);
    assertThat(relatedPosts, equalTo(posts));
  });
  describe('ignore stop words at the beginning of the headline', () => {
    it('GIVEN the searching post starts with a stop word WHEN searching THEN find related ones that start with the second word', () => {
      const posts = [
        newPost('The stop word'),
        newPost('Stop word'),
      ];
      const relatedPosts = findRelatedPosts(posts[0], posts);
      assertThat(relatedPosts, equalTo(posts));
    });
    it('GIVEN the searched post starts with a stop word WHEN searching THEN find it too', () => {
      const posts = [
        newPost('Stop word'),
        newPost('The stop word'),
      ];
      const relatedPosts = findRelatedPosts(posts[0], posts);
      assertThat(relatedPosts, equalTo(posts));
    });
    it('GIVEN a stop word and one more word only WHEN searching THEN find it too', () => {
      const posts = [
        newPost('The Shop'),
        newPost('Shop'),
      ];
      const relatedPosts = findRelatedPosts(posts[0], posts);
      assertThat(relatedPosts, equalTo(posts));
    });
    it('GIVEN a one word headline WHEN the searched post starts with a stop word THEN find it too', () => {
      const posts = [
        newPost('word'),
        newPost('The word'),
      ];
      const relatedPosts = findRelatedPosts(posts[0], posts);
      assertThat(relatedPosts, equalTo(posts));
    });
    it('GIVEN a stop word and one more word only WHEN searching without success THEN find nothing', () => {
      const posts = [
        newPost('The Online Shop'),
        newPost('The Yoyo Noway'),
      ];
      const relatedPosts = findRelatedPosts(posts[0], posts);
      assertThat(relatedPosts, equalTo([posts[0]]));
    });
    it('GIVEN a stop word + one word headline WHEN the searched post starts with a stop word too AND no match THEN find nothing', () => {
      const posts = [
        newPost('The Online'),
        newPost('The Yoyo'),
      ];
      const relatedPosts = findRelatedPosts(posts[0], posts);
      assertThat(relatedPosts, equalTo([posts[0]]));
    });
  });
  it('GIVEN only one word matches WHEN searching for related posts THEN match on one word', () => {
    const posts = [
      newPost('Newsletter #1'),
      newPost('Newsletter #2'),
    ];
    const relatedPosts = findRelatedPosts(posts[0], posts);
    assertThat(relatedPosts, equalTo(posts));
  });
  it('GIVEN unrelated posts WHEN searching for related posts THEN find nothing', () => {
    const post1 = newPost('About JavaScript');
    const post2 = newPost('How to fly');
    const relatedPosts = findRelatedPosts(post1, [post1, post2]);
    assertThat(relatedPosts, equalTo([post1]));
  });
});