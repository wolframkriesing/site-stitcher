import assert from 'assert';
import {assertThat, hasProperties} from 'hamjest';
import {describe, it} from 'mocha';

import {loadManyBlogPostSourceFiles} from './load-blog-post-source-file.js';

describe('Load blog post source files from a directory', () => {
  describe('GIVEN a list of files', () => {
    const loadManySourceFiles = async (files) => {
      const findBlogPostSourceFilenames = async () => files;
      const load = loadManyBlogPostSourceFiles({findBlogPostSourceFilenames});
      return await load();
    };
    it('WHEN the list is empty THEN no source files are returned', async () => {
      const noFiles = [];
      const manySourceFiles = await loadManySourceFiles(noFiles);
      assert.deepStrictEqual(manySourceFiles, []);
    });
    it('WHEN one file is given THEN return one BlogPostSourceFile', async () => {
      const manySourceFiles = await loadManySourceFiles(['2018/05/13-post.md']);
      assert.strictEqual(manySourceFiles.length, 1);
      // TODO must be SourceFile instance (or not?)!!!
      assertThat(manySourceFiles[0], hasProperties({
        filename: '2018/05/13-post.md',
        dateCreated: '2018-05-13'
      }));
    });
    it('WHEN multiple files are given THEN return all BlogPostSourceFiles', async () => {
      const files = [
        '/a/path/2010/01/01-post.md',
        '/a/path/2011/02/28-post.md',
        '/a/path/2012/12/31-post.md',
        '/a/path/2018/10/13-post.md',
      ];
      const manySourceFiles = await loadManySourceFiles(files);
      assert.strictEqual(manySourceFiles.length, 4);
      assertThat(manySourceFiles[0], hasProperties({filename: files[0]}));
      assertThat(manySourceFiles[1], hasProperties({filename: files[1]}));
      assertThat(manySourceFiles[2], hasProperties({filename: files[2]}));
      assertThat(manySourceFiles[3], hasProperties({filename: files[3]}));
    });
  });
});