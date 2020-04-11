import assert from 'assert';
import {assertThat, hasProperties} from 'hamjest';
import {describe, it} from 'mocha';

import {loadManyBlogPostSourceFiles} from './load-blog-post-source-file.js';

describe('Load blog post source files from a directory', () => {
  describe('GIVEN a list of files', () => {
    const defaultPath = '';
    const loadManySourceFiles = async (files, path = defaultPath) => {
      const findFilesInDir = async () => files;
      const load = loadManyBlogPostSourceFiles({findFilesInDir});
      return await load(path);
    };
    it('WHEN the list is empty THEN no source files are returned', async () => {
      const noFiles = [];
      const manySourceFiles = await loadManySourceFiles(noFiles);
      assert.deepStrictEqual(manySourceFiles, []);
    });
    it('WHEN one file is given THEN return one BlogPostSourceFile', async () => {
      const manySourceFiles = await loadManySourceFiles(['2018/05/13-post.md']);
      assert.strictEqual(manySourceFiles.length, 1);
      assertThat(manySourceFiles[0], hasProperties({
        markdownFilename: '2018/05/13-post.md',
        dateCreated: '2018-05-13'
      })); // TODO must be SourceFile properties!!!
    });
    it('WHEN multiple files are given THEN return all BlogPostSourceFiles', async () => {
      const files = [
        '2010/01/01-post.md',
        '2011/02/28-post.md',
        '2012/12/31-post.md',
        '2018/10/13-post.md',
      ];
      const path = '/the/path';
      const manySourceFiles = await loadManySourceFiles(files, path);
      assert.strictEqual(manySourceFiles.length, 4);
      assertThat(manySourceFiles[0], hasProperties({markdownFilename: path + '/' + files[0]})); // TODO must be `filename` once its a SourceFile!!!
      assertThat(manySourceFiles[1], hasProperties({markdownFilename: path + '/' + files[1]})); // TODO must be `filename` once its a SourceFile!!!
      assertThat(manySourceFiles[2], hasProperties({markdownFilename: path + '/' + files[2]})); // TODO must be `filename` once its a SourceFile!!!
      assertThat(manySourceFiles[3], hasProperties({markdownFilename: path + '/' + files[3]})); // TODO must be `filename` once its a SourceFile!!!
    });
  });
});