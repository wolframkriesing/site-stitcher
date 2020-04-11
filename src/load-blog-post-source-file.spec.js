import assert from 'assert';
import {assertThat, hasProperties} from 'hamjest';
import {describe, it} from 'mocha';

import {loadManyBlogPostSourceFilesFromFilesystem, toManyBlogPostSourceFiles} from './load-blog-post-source-file.js';
import {BlogPost} from './BlogPost.js';

describe('Load blog post source files from a given directory', () => {
  describe('GIVEN a list of files', () => {
    const loadManySourceFiles = async (noFiles) => {
      const findFilesInDir = async () => noFiles;
      const load = loadManyBlogPostSourceFilesFromFilesystem({findFilesInDir});
      const irrelevantPath = '';
      return await load(irrelevantPath);
    };
    it('WHEN the list is empty THEN no posts are returned', async () => {
      const noFiles = [];
      const manySourceFiles = await loadManySourceFiles(noFiles);
      assert.deepStrictEqual(manySourceFiles, []);
    });
    describe('WHEN one file is given', () => {
      const file = '2018/05/13-post.md';
      it('THEN return one BlogPostSourceFile', async () => {
        const manySourceFiles = await loadManySourceFiles([file]);
        assert.strictEqual(manySourceFiles.length, 1);
        assertThat(manySourceFiles[0], hasProperties({markdownFilename: file})); // TODO must be `filename` once its a SourceFile!!!
      });
      it('AND the file is the index.md inside a dir THEN set the `url` property correctly', () => {
        const file = '2001/01/01-new-post/index.md';
        const blogPostList = toManyBlogPostSourceFiles([file], '');
        assert.strictEqual(blogPostList[0].url, '/blog/2001/01/01-new-post/');
      });
    });
    it('WHEN multiple files are given THEN return all BlogPost items', () => {
      const files = [
        '2010/01/01-post.md',
        '2011/02/28-post.md',
        '2012/12/31-post.md',
        '2018/10/13-post.md',
      ];
      const expectedBlogPosts = [
        BlogPost.preload('2010/01/01-post.md'),
        BlogPost.preload('2011/02/28-post.md'),
        BlogPost.preload('2012/12/31-post.md'),
        BlogPost.preload('2018/10/13-post.md'),
      ];
      const blogPostList = toManyBlogPostSourceFiles(files, '');
      assert.strictEqual(blogPostList.length, 4);
      assert(blogPostList[0].equals(expectedBlogPosts[0]));
      assert(blogPostList[1].equals(expectedBlogPosts[1]));
      assert(blogPostList[2].equals(expectedBlogPosts[2]));
      assert(blogPostList[3].equals(expectedBlogPosts[3]));
    });
  });
});