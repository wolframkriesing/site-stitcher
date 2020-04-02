import {describe, it} from 'mocha';
import assert from 'assert';
import {buildBlogPostListFromFiles} from './preload-blog-post.js';
import {loadBlogPostList} from './load-blog-post.js';
import * as path from 'path';

const blogPostsDirectory = path.join(__dirname, '../content/blog-posts');

describe('Build posts from real files (tests are slow therefore)', () => {
  it('GIVEN one file WHEN loading works THEN return a complete BlogPost object', async () => {
    const files = ['2018/05/13-jscoderetreat-13-tetris-again.md'];
    const posts = await loadBlogPostList()(buildBlogPostListFromFiles(files, blogPostsDirectory));

    const expectedAbstract = `It was the second time that we did Tetris as our task for the JSCodeRetreat and I have to say,
that the participants' comment made me realize that we are on the right track.
Though not all comments were purely in favor of Tetris, I think Tetris is the better
task for a (JS) CodeRetreat.`;
    assert.strictEqual(posts[0].dateCreated, '2018-05-13');
    assert.strictEqual(posts[0].headline, 'JSCodeRetreat #13, Tetris again');
    assert.strictEqual(posts[0].abstract, expectedAbstract);
  });
});
