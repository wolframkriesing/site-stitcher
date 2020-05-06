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
const render = (data) => {
  try {
    return tundra.getRender('tidbit/index.html', data);
  } catch (e) {
    return 'ERROR rendering: ' + e;
  }
}

const renderTidbits = ({writeFile = prodDeps()}) => async (tidbits) => {
  writeFile('/tidbits/index.html', render({tidbits}));
  writeFile('/tidbits/2000/01/a-tidbit/index.html', render({tidbits}));
};

describe('Render tidbits pages', () => {
  describe('GIVEN some tidbits WHEN rendering them', () => {
    const renderResult = tidbits => {
      let writtenToFile = '';
      const writeFile = async (filename, content) => writtenToFile = content;
      renderTidbits({writeFile})(tidbits);
      return writtenToFile;
    };
    describe('THEN render the tidbits overview/index page', () => {
      it('AND render the headlines as H2', () => {
        const writtenToFile = renderResult([
          Tidbit.withRawData({headline: 'Tidbit1', tags: ['1st']}),
          Tidbit.withRawData({headline: 'Tidbit2', tags: ['1st']}),
          Tidbit.withRawData({headline: 'Tidbit3', tags: ['1st']}),
        ]);
        assertThat(writtenToFile, matchesPattern(/<h2 id="tidbit1">.*Tidbit1.*<\/h2>/gms));
        assertThat(writtenToFile, matchesPattern(/<h2 id="tidbit2">.*Tidbit2.*<\/h2>/gms));
        assertThat(writtenToFile, matchesPattern(/<h2 id="tidbit3">.*Tidbit3.*<\/h2>/gms));
      });
      it('AND renders the SPANs for the first tag AND the data-attribute renders the tag`s slug', () => {
        const writtenToFile = renderResult([
          Tidbit.withRawData({headline: 'irrelevant', tags: ['a11y']}),
          Tidbit.withRawData({headline: 'irrelevant', tags: ['one']}),
          Tidbit.withRawData({headline: 'irrelevant', tags: ['oh my god']}),
        ]);
        assertThat(writtenToFile, containsString('<span class="tag" data-tag="a11y">#a11y</span>'));
        assertThat(writtenToFile, containsString('<span class="tag" data-tag="one">#one</span>'));
        assertThat(writtenToFile, containsString('<span class="tag" data-tag="oh-my-god">#oh my god</span>'));
      });
      it('AND write to "/tidbits/index.html" (even when no tidbits are given, just make sure we write to the correct file)', () => {
        const noTidbits = [];
        const writtenToFilenames = [];
        const writeFile = async (filename, _) => writtenToFilenames.push(filename);
        renderTidbits({writeFile})(noTidbits);
        assertThat(writtenToFilenames, hasItem('/tidbits/index.html'));
      });
    });
    describe('THEN render a page per tidbit', () => {
      it('AND write to "/tidbits/2000/01/a-tidbit/index.html"', () => {
        const tidbits = [
          Tidbit.withRawData({headline: 'A Tidbit', dateCreated: '2000-01-01 10:00 CET', tags: []}),
        ];
        const writtenToFilenames = [];
        const writeFile = async (filename, _) => writtenToFilenames.push(filename);
        renderTidbits({writeFile})(tidbits);
        assertThat(writtenToFilenames, hasItem('/tidbits/2000/01/a-tidbit/index.html'));
      });
    });
  });
});
