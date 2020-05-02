import {describe, it} from 'mocha';
import assert from 'assert';
import {assertThat, not, hasProperty, hasItem, endsWith, everyItem, instanceOf} from 'hamjest';
import * as path from 'path';
import {loadManyTidbitSourceFiles} from './load-tidbit-source-file.js';
import {TidbitSourceFile} from './TidbitSourceFile.js';

const tidbitDirectory = path.join(__dirname, '../../test-content/tidbit');

describe('Load tidbit source files from a directory (tests are slow, working against a real fs)', () => {
  describe('GIVEN a tidbits-directory WHEN loading the files', () => {
    it('THEN return objects with expected `monthAndYear` and `filename`', async () => {
      const posts = await loadManyTidbitSourceFiles()(tidbitDirectory);
      assert(posts.length > 0);
      assert.strictEqual(posts[0].filename, `${tidbitDirectory}/2000/01/index.md`);
      assert.strictEqual(posts[0].monthAndYear, '2000-01');
      assert.strictEqual(posts[1].filename, `${tidbitDirectory}/2042/12/index.md`);
      assert.strictEqual(posts[1].monthAndYear, '2042-12');
    });
    it('AND the image file does NOT show up as tidbit file', async () => {
      const posts = await loadManyTidbitSourceFiles()(tidbitDirectory);
      assertThat(posts, not(hasItem(hasProperty('filename', endsWith('empty-image.gif')))));
    });
    it('AND each file is a TidbitSourceFile instance', async () => {
      const posts = await loadManyTidbitSourceFiles()(tidbitDirectory);
      assertThat(posts, everyItem(instanceOf(TidbitSourceFile)));
    });
  });
});
