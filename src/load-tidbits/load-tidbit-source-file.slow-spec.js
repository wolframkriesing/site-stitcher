import {describe, it} from 'mocha';
import assert from 'assert';
import * as path from 'path';

const loadManyTidbitSourceFiles = () => async (dir) => {

}

const tidbitDirectory = path.join(__dirname, '../test-content/tidbit');

describe('Load tidbit source files from a directory (tests are slow, working against a real fs)', () => {
  it('GIVEN directory WHEN loading the files THEN return objects with expected `monthAndYear` and `filename`', async () => {
    const posts = await loadManyTidbitSourceFiles()(tidbitDirectory);
    assert(posts.length > 0);
    assert.strictEqual(posts[0].filename, `${tidbitDirectory}/2000/01/index.md`);
    assert.strictEqual(posts[0].monthAndYear, '2000-01');
  });
});
