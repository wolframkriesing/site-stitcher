import {describe, it} from 'mocha';
import assert from 'assert';
import * as path from 'path';
import {preloadBlogPostListFromDirectory} from './preload-blog-post.js';

const blogPostsDirectory = path.join(__dirname, '../test-content/blog-posts');

describe('Preload blog posts from a given directory (tests are slow, working against a real fs)', () => {
  it('GIVEN directory with blog posts WHEN preloading THEN return blog posts with `dateCreated` set', async () => {
    const posts = await preloadBlogPostListFromDirectory()(blogPostsDirectory);
    assert(posts.length > 0);
    assert.strictEqual(posts[0].dateCreated, '2000-01-01');
    assert.strictEqual(posts[0].filename, `${blogPostsDirectory}/2000/01/01-normal-post.md`);
  });
});
