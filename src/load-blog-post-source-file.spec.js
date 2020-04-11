import assert from 'assert';
import {assertThat, hasProperties} from 'hamjest';
import {describe, it} from 'mocha';

import {loadManyBlogPostSourceFilesFromFilesystem} from './load-blog-post-source-file.js';

describe('Load blog post source files from a given directory', () => {
  describe('GIVEN a list of files', () => {
    const defaultPath = '';
    const loadManySourceFiles = async (files, path = defaultPath) => {
      const findFilesInDir = async () => files;
      const load = loadManyBlogPostSourceFilesFromFilesystem({findFilesInDir});
      return await load(path);
    };
    it('WHEN the list is empty THEN no source files are returned', async () => {
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