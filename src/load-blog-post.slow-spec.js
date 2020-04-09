import {describe, it} from 'mocha';
import assert from 'assert';
import {preloadBlogPostList} from './preload-blog-post.js';
import {loadBlogPostList} from './load-blog-post.js';
import * as path from 'path';

const blogPostsDirectory = path.join(__dirname, '../test-content/blog-posts');

describe('Build posts from real files (tests are slow therefore)', () => {
  it('GIVEN one file WHEN loading works THEN return a complete BlogPost object', async () => {
    const files = ['2000/01/01-normal-post.md'];
    const posts = await loadBlogPostList()(preloadBlogPostList(files, blogPostsDirectory));

    const expectedAbstract = `Abstract`;
    assert.strictEqual(posts[0].dateCreated, '2000-01-01');
    assert.strictEqual(posts[0].headline, 'Normal Post');
    assert.strictEqual(posts[0].abstract, expectedAbstract);
  });
});

