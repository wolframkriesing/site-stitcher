import {describe, it} from 'mocha';
import {assertThat, hasProperties, instanceOf} from 'hamjest';
import * as path from 'path';
import {TidbitSourceFile} from './TidbitSourceFile.js';
import {loadTidbits, Tidbit} from './load-tidbit.js';

const tidbitDirectory = path.join(__dirname, '../../test-content/tidbit');

describe('Load a tidbit file (one month)', () => {
  describe('GIVEN one source file with one tidbit in it', () => {
    it('WHEN tidbit has headline and first paragraph only THEN provide: url, dateCreated, sourceFilename, headline and abstract', async () => {
      const filename = path.join(tidbitDirectory, '2000/01/index.md');
      const tidbit = await loadTidbits([TidbitSourceFile.withFilename(filename)]);
      const expectedProps = {
        url: '/tidbit/2000/a-tidbit/',
        dateCreated: '2000-01-01 10:00 CET',
        sourceFilename: filename,
        headline: 'A Tidbit',
        abstract: 'This tidbit has ONLY the required data.',
      };
      assertThat(tidbit[0], instanceOf(Tidbit));
      assertThat(tidbit[0], hasProperties(expectedProps));
    });
    // tags
    // main tag
  });
});
