import {describe, it} from 'mocha';
import {assertThat, containsString, matchesPattern} from 'hamjest';
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
  writeFile(render({tidbits}));
};

describe.only('Render the tidbit index page', () => {
  describe('GIVEN one tidbit WHEN rendering the index page', () => {
    it('THEN render the headline as H2', () => {
      let writtenToFile = '';
      const writeFile = async (content) => writtenToFile = content;
      const tidbits = [
        Tidbit.withRawData({headline: 'Tidbit1', tags: ['a11y']}),
      ];
      renderTidbits({writeFile})(tidbits);
      assertThat(writtenToFile, matchesPattern(/<h2 id="tidbit1">.*Tidbit1.*<\/h2>/gms));
      assertThat(writtenToFile, containsString('<span class="tag" data-tag="a11y">#a11y</span>'));
    });
  });
});