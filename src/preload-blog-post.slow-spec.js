import {describe, it} from 'mocha';
import assert from 'assert';
import {assertThat, not, hasItem, hasProperty, endsWith} from 'hamjest';
import * as path from 'path';
import {preloadBlogPostListFromDirectory} from './preload-blog-post.js';

const blogPostsDirectory = path.join(__dirname, '../test-content/blog-posts');

describe('Preload blog posts from a given directory (tests are slow, working against a real fs)', () => {
  it('GIVEN directory with blog posts WHEN preloading THEN return blog posts with `dateCreated` set', async () => {
    const posts = await preloadBlogPostListFromDirectory()(blogPostsDirectory);
    assert(posts.length > 0);
    assert.strictEqual(posts[0].dateCreated, '2000-01-01');
    assert.strictEqual(posts[0].markdownFilename, `${blogPostsDirectory}/2000/01/01-normal-post.md`);
  });
  it('GIVEN a file that does NOT start with a number (the day) THEN dont find it as blog post', async () => {
    const posts = await preloadBlogPostListFromDirectory()(blogPostsDirectory);
    assertThat(posts[0], not(hasItem(hasProperty('markdownFilename', endsWith('2000/01/not-a-blog-post.txt')))));
    // how can we write this test better, it tests something that is not there ... kinda stupid :)
  });
});
