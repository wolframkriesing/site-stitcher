import {describe, it} from 'mocha';
import assert from 'assert';
import * as path from 'path';
import {findTidbitSourceFilenames} from '../_deps/fs.js';

const loadManyTidbitSourceFiles = () => async (dir) => {
  const files = await findTidbitSourceFilenames(dir);
  return files.map(file => ({filename: file, monthAndYear: file.split('/').slice(-3, -1).join('-')}));
}

const tidbitDirectory = path.join(__dirname, '../../test-content/tidbit');

describe('Load tidbit source files from a directory (tests are slow, working against a real fs)', () => {
  it('GIVEN a tidbits-directory WHEN loading the files THEN return objects with expected `monthAndYear` and `filename`', async () => {
    const posts = await loadManyTidbitSourceFiles()(tidbitDirectory);
    assert(posts.length > 0);
    assert.strictEqual(posts[0].filename, `${tidbitDirectory}/2000/01/index.md`);
    assert.strictEqual(posts[0].monthAndYear, '2000-01');
    assert.strictEqual(posts[1].filename, `${tidbitDirectory}/2042/12/index.md`);
    assert.strictEqual(posts[1].monthAndYear, '2042-12');
  });
});
