import {describe, it} from 'mocha';
import assert from 'assert';
import {buildBlogPostListFromFiles, loadBlogPostList} from './blog-post-list.js';

import * as fs from 'fs';
import * as path from 'path';

const findFilesInDir = async (dir) => {
  const yearDirectories = (await fs.promises.readdir(dir, {withFileTypes: true}))
    .filter(f => f.isDirectory())
    .map(f => path.join(dir, f.name))
  ;
  const findDirsIn = async (dir) => {
    return fs.promises.readdir(dir, {withFileTypes: true})
      .then(files => files
        .filter(f => f.isDirectory())
        .map(f => path.join(dir, f.name))
      );
  };
  const monthDirectories = (await Promise.all(yearDirectories.map(findDirsIn))).flat();
  const findPostsIn = async (dir) => {
    return fs.promises.readdir(dir, {withFileTypes: true})
      .then(files => files
        .filter(f => f.isFile())
        .map(f => path.join(dir, f.name))
      );
  };
  const files = (await Promise.all(monthDirectories.map(findPostsIn))).flat();
  const removeRootBlogPostDirectory = files => files.map(file => file.replace(dir, '').replace('/', ''))
  return removeRootBlogPostDirectory(files);
};
const preloadBlogPostListFromDirectory = () => async (path) => {
  const files = await findFilesInDir(path);
  return buildBlogPostListFromFiles(files, path)
};

describe('Preload blog posts in a given directory (tests are slow, working against a real fs)', () => {
  const blogPostsDirectory = path.join(__dirname, '../content/blog-posts');
  it('GIVEN directory with blog posts WHEN preloading THEN return blog posts with `dateCreated` set', async () => {
    const posts = await preloadBlogPostListFromDirectory()(blogPostsDirectory);
    assert(posts.length > 0);
    assert.strictEqual(posts[0].dateCreated, '2017-11-03');
    assert.strictEqual(posts[0].filename, `${blogPostsDirectory}/2017/11/03-mikado-method-to-install-a-vim-plugin.md`);
  });
});

describe('Build posts from real files (tests are slow therefore)', () => {
  it('GIVEN one file WHEN loading works THEN return a complete BlogPost object', async () => {
    const files = ['2018/05/13-jscoderetreat-13-tetris-again.md'];
    const posts = await loadBlogPostList()(buildBlogPostListFromFiles(files));

    const expectedAbstract = `It was the second time that we did Tetris as our task for the JSCodeRetreat and I have to say,
that the participants' comment made me realize that we are on the right track.
Though not all comments were purely in favor of Tetris, I think Tetris is the better
task for a (JS) CodeRetreat.`;
    assert.strictEqual(posts[0].dateCreated, '2018-05-13');
    assert.strictEqual(posts[0].headline, 'JSCodeRetreat #13, Tetris again');
    assert.strictEqual(posts[0].abstract, expectedAbstract);
  });
});
