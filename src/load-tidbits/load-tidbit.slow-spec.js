import {describe, it} from 'mocha';
import {assertThat, hasProperties, instanceOf, everyItem} from 'hamjest';
import * as path from 'path';
import {TidbitSourceFile} from './TidbitSourceFile.js';

class Tidbit {
  constructor() {
    this.url = '/tidbit/2000/a-tidbit/';
    this.dateCreated = '2000-01-01 10:00 CET';
    this.sourceFilename = '/app/test-content/tidbit/2000/01/index.md';
    this.headline = 'A Tidbit';
    this.abstract = 'This tidbit has ONLY the required data.';
  }
}
import {readFile} from '../_deps/fs.js';
const loadTidbits = async (sourceFiles) => {
  await readFile(sourceFiles[0].filename);
  return [new Tidbit()];
}

const tidbitDirectory = path.join(__dirname, '../../test-content/tidbit');

describe('Load a tidbit file (one month)', () => {
  describe('GIVEN one source file with one tidbit in it', () => {
    it('WHEN tidbit has headline and first paragraph only THEN provide: url, dateCreated, sourceFilename, headline and abstract', async () => {
      const filename = path.join(tidbitDirectory, '2000/01/index.md');
      const post = await loadTidbits([TidbitSourceFile.withFilename(filename)]);
      const expectedProps = {
        url: '/tidbit/2000/a-tidbit/',
        dateCreated: '2000-01-01 10:00 CET',
        sourceFilename: filename,
        headline: 'A Tidbit',
        abstract: 'This tidbit has ONLY the required data.',
      };
      assertThat(post[0], instanceOf(Tidbit));
      assertThat(post[0], hasProperties(expectedProps));
    });
    // tags
    // main tag
  });
});
