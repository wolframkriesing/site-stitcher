import {describe, it} from 'mocha';
import assert from 'assert';

const buildPostListFromFiles = files => [];

describe('Build a list of posts and the intro paragraph', () => {
  it('GIVEN a list of files WHEN empty THEN no posts are returned', () => {
    const postList = buildPostListFromFiles([]);
    assert.deepStrictEqual(postList, []);
  });
});