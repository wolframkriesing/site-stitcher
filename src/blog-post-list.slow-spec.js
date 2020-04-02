import {describe, it} from 'mocha';
import assert from 'assert';
import {buildBlogPostListFromFiles, loadBlogPostList} from './blog-post-list.js';

describe('Build posts from real files (tests are slow therefore)', () => {
  it('GIVEN one file WHEN loading works THEN return a complete BlogPost object', async () => {
    const files = ['2018/05/13-jscoderetreat-13-tetris-again.md'];
    const posts = await loadBlogPostList()(buildBlogPostListFromFiles(files));

    const expectedAbstract = `It was the second time that we did Tetris as our task for the JSCodeRetreat and I have to say,
that the participants' comment made me realize that we are on the right track.
Though not all comments were purely in favor of Tetris, I think Tetris is the better
task for a (JS) CodeRetreat.
`;
    assert.strictEqual(posts[0].dateCreated, '2018-05-13');
    assert.strictEqual(posts[0].headline, 'JSCodeRetreat #13, Tetris again');
    assert.strictEqual(posts[0].abstract, expectedAbstract);
  });
});
