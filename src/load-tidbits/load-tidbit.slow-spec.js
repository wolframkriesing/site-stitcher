import {describe, it} from 'mocha';
import {assertThat, hasProperties, instanceOf} from 'hamjest';
import * as path from 'path';
import {TidbitSourceFile} from './TidbitSourceFile.js';
import {loadTidbits} from './load-tidbit.js';
import {loadManyTidbitSourceFiles} from './load-tidbit-source-file.js';
import {Tidbit} from './Tidbit.js';

const tidbitDirectory = path.join(__dirname, '../../test-content/tidbit');

describe('Load a tidbit file (one month)', () => {
  describe('GIVEN one source file with one tidbit in it', () => {
    it('WHEN tidbit has headline and first paragraph only THEN provide: url, dateCreated, sourceFilename, headline and abstract', async () => {
      const filename = path.join(tidbitDirectory, '2000/01/index.md');
      const tidbit = await loadTidbits([TidbitSourceFile.withFilename(filename)]);
      const expectedProps = {
        // url: '/tidbit/2000/01/a-tidbit/',
        dateCreated: '2000-01-01 10:00 CET',
        // sourceFilename: filename,
        headline: 'A Tidbit',
        abstractAsHtml: 'This tidbit has ONLY the required data.',
      };
      assertThat(tidbit[0], instanceOf(Tidbit));
      assertThat(tidbit[0], hasProperties(expectedProps));
    });
  });
});

describe('Load many tidbits', () => {
  it('GIVEN a dir with many tidbits THEN load and provide them all', async () => {
    const sourceFiles = await loadManyTidbitSourceFiles()(tidbitDirectory);
    const tidbits = await loadTidbits(sourceFiles);
    const expectedProps = {
      dateCreated: '2000-01-01 10:00 CET',
      headline: 'A Tidbit',
      abstractAsHtml: 'This tidbit has ONLY the required data.',
    };
    assertThat(tidbits[0], hasProperties(expectedProps));
    assertThat(tidbits[1], hasProperties({headline: 'Empty', abstractAsHtml: ':('}));
  });
});