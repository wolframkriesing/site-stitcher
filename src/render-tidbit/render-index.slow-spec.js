import {describe, it} from 'mocha';
import {assertThat, containsString, equalTo, matchesPattern} from 'hamjest';
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
};

describe('Render the tidbit index page', () => {
  describe('GIVEN one tidbit WHEN rendering the index page', () => {
    const renderResult = oneTidbit => {
      let writtenToFile = '';
      const writeFile = async (filename, content) => writtenToFile = content;
      renderTidbits({writeFile})([oneTidbit]);
      return writtenToFile;
    };
    it('THEN render the headline as H2', () => {
      const writtenToFile = renderResult(Tidbit.withRawData({headline: 'Tidbit1'}));
      assertThat(writtenToFile, matchesPattern(/<h2 id="tidbit1">.*Tidbit1.*<\/h2>/gms));
    });
    it('THEN renders the SPAN for the tag', () => {
      const writtenToFile = renderResult(Tidbit.withRawData({headline: 'irrelevant', tags: ['a11y']}));
      assertThat(writtenToFile, containsString('<span class="tag" data-tag="a11y">#a11y</span>'));
    });
    it('THEN writes the rendered string to "/tidbits/index.html"', () => {
      const tidbit = Tidbit.withRawData({headline: 'A Tidbit', dateCreated: '2222-02-02 10:00 CET', tags: ['a11y']});
      let writtenToFilename = '';
      const writeFile = async (filename, _) => writtenToFilename = filename;
      renderTidbits({writeFile})([tidbit]);
      assertThat(writtenToFilename, equalTo('/tidbits/index.html'));
    });
  });
});
