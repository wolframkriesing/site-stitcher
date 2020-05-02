import {describe, it} from 'mocha';
import assert from 'assert';
import * as path from 'path';

import * as fs from 'fs';
export const readFile = async (filename) => fs.promises.readFile(filename, 'utf8');
const loadManyTidbitSourceFiles = () => async (dir) => {
  const file = await readFile(path.join(dir, '2000/01/index.md'));
  return [
    {filename: `${dir}/2000/01/index.md`, monthAndYear: '2000-01'},
    {filename: `${dir}/2042/12/index.md`, monthAndYear: '2042-12'},
  ];
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
