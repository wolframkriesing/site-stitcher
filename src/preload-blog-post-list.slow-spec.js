import {describe, it} from 'mocha';
import assert from 'assert';
import * as path from 'path';
import {preloadBlogPostListFromDirectory} from './preload-blog-post-list.js';

describe('Preload blog posts in a given directory (tests are slow, working against a real fs)', () => {
  const blogPostsDirectory = path.join(__dirname, '../content/blog-posts');
  it('GIVEN directory with blog posts WHEN preloading THEN return blog posts with `dateCreated` set', async () => {
    const posts = await preloadBlogPostListFromDirectory()(blogPostsDirectory);
    assert(posts.length > 0);
    assert.strictEqual(posts[0].dateCreated, '2017-11-03');
    assert.strictEqual(posts[0].filename, `${blogPostsDirectory}/2017/11/03-mikado-method-to-install-a-vim-plugin.md`);
  });
});
