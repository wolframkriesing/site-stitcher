import {describe, it} from 'pico-tester';
import assert from 'assert';
import {assertThat, not, hasItem, hasProperty, endsWith} from 'hamjest';
import * as path from 'path';
import {loadManyBlogPostSourceFiles} from './load-blog-post-source-file.js';
import {TEST_CONTENT_DIRECTORY} from '../config.js';

const blogPostsDirectory = path.join(TEST_CONTENT_DIRECTORY, 'blog-posts');

describe('Load blog post source files from a directory (tests are slow, working against a real fs)', () => {
  it('GIVEN directory WHEN loading the files THEN return source file with correct `dateCreated` and `filename`', async () => {
    const posts = await loadManyBlogPostSourceFiles()(blogPostsDirectory);
    assert(posts.length > 0);
    assert.strictEqual(posts[0].filename, `${blogPostsDirectory}/2000/01/01-simplest-post.md`);
    assert.strictEqual(posts[0].dateCreated, '2000-01-01');
  });
  it('GIVEN an invalid blog post source file (not starting with a number, the day) THEN don`t find it as blog post source file', async () => {
    const posts = await loadManyBlogPostSourceFiles()(blogPostsDirectory);
    assertThat(posts[0], not(hasItem(hasProperty('filename', endsWith('2000/01/not-a-blog-post.txt')))));
    // how can we write this test better, it tests something that is not there ... kinda stupid :)
  });
  it('GIVEN 2000/01/01-post/index.md (post inside a dir) THEN find it as valid blog post source file', async () => {
    const posts = await loadManyBlogPostSourceFiles()(blogPostsDirectory);
    assertThat(posts, hasItem(hasProperty('filename', endsWith('2000/01/02-post-in-dir/index.md'))));
  });
});
