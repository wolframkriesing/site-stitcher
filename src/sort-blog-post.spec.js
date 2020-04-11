import {describe, it} from 'mocha';
import assert from 'assert';
import {sortByDateCreatedAscending, sortByDateCreatedDescending} from './sort-blog-post.js';

describe('Sort objects (or blog posts) by property `dateCreated`', () => {
  const unsortedPosts = [
    {dateCreated: '2002-03-03'},
    {dateCreated: '2002-02-02'},
    {dateCreated: '2004-04-04'},
    {dateCreated: '2001-01-01'},
  ];
  it('GIVEN many unsorted posts WHEN sorted ascending THEN they are in the right order', () => {
    const expectedPosts = [
      {dateCreated: '2001-01-01'},
      {dateCreated: '2002-02-02'},
      {dateCreated: '2002-03-03'},
      {dateCreated: '2004-04-04'},
    ];
    const sorted = unsortedPosts.sort(sortByDateCreatedAscending);
    assert.deepStrictEqual(sorted, expectedPosts);
  });
  it('GIVEN many unsorted posts WHEN sorted descending THEN they are in the right order', () => {
    const expectedPosts = [
      {dateCreated: '2004-04-04'},
      {dateCreated: '2002-03-03'},
      {dateCreated: '2002-02-02'},
      {dateCreated: '2001-01-01'},
    ];
    const sorted = unsortedPosts.sort(sortByDateCreatedDescending);
    assert.deepStrictEqual(sorted, expectedPosts);
  });
});