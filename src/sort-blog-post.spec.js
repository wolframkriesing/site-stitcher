import {describe, it} from 'mocha';
import assert from 'assert';
import {loadBlogPostList} from './load-blog-post.js';
import {BlogPost} from './BlogPost.js';

const sortBlogPostListByDateCreated = blogPostList =>
  blogPostList.sort((p1, p2) => p1.dateCreated < p2.dateCreated ? -1 : 1);

describe('Sort blog posts by date', () => {
  it('GIVEN many unsorted posts WHEN sorted THEN they are in the right order', () => {
    const unsortedPosts = [
      BlogPost.withDateCreated('2002-03-03'),
      BlogPost.withDateCreated('2002-02-02'),
      BlogPost.withDateCreated('2004-04-04'),
      BlogPost.withDateCreated('2001-01-01'),
    ];
    const expectedPosts = [
      BlogPost.withDateCreated('2001-01-01'),
      BlogPost.withDateCreated('2002-02-02'),
      BlogPost.withDateCreated('2002-03-03'),
      BlogPost.withDateCreated('2004-04-04'),
    ];
    const sorted = sortBlogPostListByDateCreated(unsortedPosts);
    assert.deepStrictEqual(sorted, expectedPosts);
  });
});