import {describe, it} from 'mocha';
import assert from 'assert';
import {BlogPost} from './BlogPost.js';
import {sortByDateCreatedAscending, sortByDateCreatedDescending} from './sort-blog-post.js';

describe('Sort blog posts by date', () => {
  const unsortedPosts = [
    BlogPost.preload('2002/03/03-post.md'),
    BlogPost.preload('2002/02/02-post.md'),
    BlogPost.preload('2004/04/04-post.md'),
    BlogPost.preload('2001/01/01-post.md'),
  ];
  it('GIVEN many unsorted posts WHEN sorted ascending THEN they are in the right order', () => {
    const expectedPosts = [
      BlogPost.preload('2001/01/01-post.md'),
      BlogPost.preload('2002/02/02-post.md'),
      BlogPost.preload('2002/03/03-post.md'),
      BlogPost.preload('2004/04/04-post.md'),
    ];
    const sorted = unsortedPosts.sort(sortByDateCreatedAscending);
    assert.deepStrictEqual(sorted, expectedPosts);
  });
  it('GIVEN many unsorted posts WHEN sorted descending THEN they are in the right order', () => {
    const expectedPosts = [
      BlogPost.preload('2004/04/04-post.md'),
      BlogPost.preload('2002/03/03-post.md'),
      BlogPost.preload('2002/02/02-post.md'),
      BlogPost.preload('2001/01/01-post.md'),
    ];
    const sorted = unsortedPosts.sort(sortByDateCreatedDescending);
    assert.deepStrictEqual(sorted, expectedPosts);
  });
});