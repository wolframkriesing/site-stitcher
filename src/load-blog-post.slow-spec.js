import {describe, it} from 'mocha';
import assert from 'assert';
import {loadManyBlogPostSourceFilesFromFilesystem} from './load-blog-post-source-file.js';
import {loadManyBlogPosts} from './load-blog-post.js';
import * as path from 'path';

const blogPostsDirectory = path.join(__dirname, '../test-content/blog-posts');

describe('Build posts from real files (tests are slow therefore)', () => {
  it('GIVEN one file WHEN loading works THEN return a complete BlogPost object', async () => {
    const sourceFiles = await loadManyBlogPostSourceFilesFromFilesystem()(blogPostsDirectory);
    const posts = await loadManyBlogPosts()(sourceFiles);

    const expectedAbstract = `Abstract`;
    assert.strictEqual(posts[0].dateCreated, '2000-01-01');
    assert.strictEqual(posts[0].headline, 'Simplest Post');
    assert.strictEqual(posts[0].abstract, expectedAbstract);
  });
});
