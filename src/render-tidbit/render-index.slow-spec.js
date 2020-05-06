import {describe, it} from 'mocha';
import {assertThat, containsString, equalTo, matchesPattern, hasItem} from 'hamjest';
import {Tidbit} from "../load-tidbit/Tidbit.js";

import path from 'path';
import Tundra from 'tundrajs';

import {writeFile} from '../_deps/fs.js';

const prodDeps = () => {
  return {writeFile};
}

const tundra = new Tundra({cache: false});
tundra.setBase(path.join(__dirname, '../templates'));
const renderIndexPage = (data) => {
  try {
    return tundra.getRender('tidbit/index.html', data);
  } catch (e) {
    return 'ERROR rendering: ' + e;
  }
}
const renderTidbitPage = (data) => {
  try {
    return tundra.getRender('tidbit/page.html', data);
  } catch (e) {
    return 'ERROR rendering: ' + e;
  }
}

const renderAndWriteTidbitsIndexPage = ({writeFile = prodDeps()}) => async (tidbits) => {
  await writeFile('/tidbit/index.html', renderIndexPage({tidbits}));
};

const renderAndWriteTidbitPage = ({writeFile = prodDeps()}) => async (tidbits) => {
  const pageWriters = tidbits.map(t => writeFile(t.url + 'index.html', renderTidbitPage({tidbit: t})));
  await Promise.all(pageWriters);
};

describe('Render tidbits pages', () => {
  describe('GIVEN some tidbits WHEN rendering them', () => {
    const renderResult = async tidbits => {
      let writtenToFile = '';
      const writeFile = async (filename, content) => writtenToFile = content;
      await renderAndWriteTidbitsIndexPage({writeFile})(tidbits);
      return writtenToFile;
    };
    describe('THEN render the tidbits overview/index page', () => {
      it('AND render the headlines as H2', async () => {
        const writtenToFile = await renderResult([
          Tidbit.withRawData({headline: 'Tidbit1', tags: ['1st']}),
          Tidbit.withRawData({headline: 'Tidbit2', tags: ['1st']}),
          Tidbit.withRawData({headline: 'Tidbit3', tags: ['1st']}),
        ]);
        assertThat(writtenToFile, matchesPattern(/<h2 id="tidbit1">.*Tidbit1.*<\/h2>/gms));
        assertThat(writtenToFile, matchesPattern(/<h2 id="tidbit2">.*Tidbit2.*<\/h2>/gms));
        assertThat(writtenToFile, matchesPattern(/<h2 id="tidbit3">.*Tidbit3.*<\/h2>/gms));
      });
      it('AND renders the SPANs for the first tag AND the data-attribute renders the tag`s slug', async () => {
        const writtenToFile = await renderResult([
          Tidbit.withRawData({headline: 'irrelevant', tags: ['a11y']}),
          Tidbit.withRawData({headline: 'irrelevant', tags: ['one']}),
          Tidbit.withRawData({headline: 'irrelevant', tags: ['oh my god']}),
        ]);
        assertThat(writtenToFile, containsString('<span class="tag" data-tag="a11y">#a11y</span>'));
        assertThat(writtenToFile, containsString('<span class="tag" data-tag="one">#one</span>'));
        assertThat(writtenToFile, containsString('<span class="tag" data-tag="oh-my-god">#oh my god</span>'));
      });
      it('AND write to "/tidbit/index.html" (even when no tidbits are given, just make sure we write to the correct file)', async () => {
        const noTidbits = [];
        const writtenToFilenames = [];
        const writeFile = async (filename, _) => writtenToFilenames.push(filename);
        await renderAndWriteTidbitsIndexPage({writeFile})(noTidbits);
        assertThat(writtenToFilenames, hasItem('/tidbit/index.html'));
      });
    });
    describe('THEN render a page per tidbit', () => {
      it('AND write one tidbit to "/tidbit/2000/01/a-tidbit/index.html"', async () => {
        const tidbits = [
          Tidbit.withRawData({headline: 'A Tidbit', dateCreated: '2000-01-01 10:00 CET', tags: []}),
        ];
        const writtenToFilenames = [];
        const writeFile = async (filename, _) => writtenToFilenames.push(filename);
        await renderAndWriteTidbitPage({writeFile})(tidbits);
        assertThat(writtenToFilenames, hasItem('/tidbit/2000/01/a-tidbit/index.html'));
      });
      it('AND write a file per tidbit', async () => {
        const tidbits = [
          Tidbit.withRawData({headline: 'Tidbit 1', dateCreated: '2001-01-01 11:00 CET', tags: []}),
          Tidbit.withRawData({headline: 'Tidbit 2', dateCreated: '2002-02-01 12:00 CET', tags: []}),
          Tidbit.withRawData({headline: 'Tidbit 3', dateCreated: '2003-03-01 13:00 CET', tags: []}),
          Tidbit.withRawData({headline: 'Tidbit 4', dateCreated: '2004-04-01 14:00 CET', tags: []}),
        ];
        const writtenToFilenames = [];
        const writeFile = async (filename, _) => writtenToFilenames.push(filename);
        await renderAndWriteTidbitPage({writeFile})(tidbits);
        assertThat(writtenToFilenames, hasItem('/tidbit/2001/01/tidbit-1/index.html'));
        assertThat(writtenToFilenames, hasItem('/tidbit/2002/02/tidbit-2/index.html'));
        assertThat(writtenToFilenames, hasItem('/tidbit/2003/03/tidbit-3/index.html'));
        assertThat(writtenToFilenames, hasItem('/tidbit/2004/04/tidbit-4/index.html'));
      });
    });
  });
});
