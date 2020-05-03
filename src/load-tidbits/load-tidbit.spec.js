import {describe, it} from 'mocha';
import * as assert from 'assert';
import {assertThat, instanceOf, hasProperties} from 'hamjest';

/**
 * @type {import("./Tidbit").Tidbit}
 */
class Tidbit {
  /**
   * @param raw {PlainObject}
   * @return {import("./Tidbit").Tidbit}
   */
  static withRawData(raw) {
    const tidbit = new Tidbit();
    tidbit.headline = raw.headline;
    tidbit.abstract = raw.abstract;
    tidbit.dateCreated = raw.dateCreated;
    tidbit.tags = raw.tags;
    return tidbit;
  }

  /**
   * @return {RelativeUrl}
   */
  get url() {
    const datePart = this.dateCreated.split('-').slice(0, 2).join('/');
    const slug = new marked.Slugger().slug(this.headline);
    return '/tidbit/' + datePart + '/' + slug + '/';
  }
}

import * as marked from 'marked';
import {parseMetadata} from '../_shared/parse-metadata.js';
const loadTidbitFile = (markdown) => {
  const tokens = marked.lexer(markdown);
  const metadataParseConfigss = [
    {key: 'dateCreated', type: 'string'},
    {key: 'tags', type: 'array'},
  ];
  const data = {
    headline: tokens[0].text,
    abstract: tokens[3].text,
    ...parseMetadata(tokens[1], metadataParseConfigss)
  };
  return [Tidbit.withRawData(data)];
}

describe('Load a tidbit file (one month)', () => {
  describe('GIVEN one tidbit in it', () => {
    describe('WHEN tidbit has all required data (headline, dateCreated, paragraph)', () => {
      const load = () => {
        const fileContent = [
          '# A Tidbit', '',
          'dateCreated: 2111-11-11 11:11 CET', '',
          'One paragraph'
        ].join('\n');
        return loadTidbitFile(fileContent);
      };
      it('THEN find one tidbit', () => {
        assert.equal(load().length, 1);
      });
      it('THEN this one be a Tidbit instance', () => {
        assertThat(load()[0], instanceOf(Tidbit));
      });
      it('THEN it has the headline "A Tidbit"', () => {
        assertThat(load()[0].headline, 'A Tidbit');
      });
      it('THEN it has the dateCreated = 2111-11-11 11:11 CET', () => {
        assertThat(load()[0].dateCreated, '2111-11-11 11:11 CET');
      });
      it('THEN it has the url = /tidbit/2111/11/a-tidbit/', () => {
        assertThat(load()[0].url, '/tidbit/2111/11/a-tidbit/');
      });
      it('THEN it has the abstract = "One paragraph"', () => {
        assertThat(load()[0].abstract, 'One paragraph');
      });
      it('THEN it has not tags', () => {
        assertThat(load()[0], hasProperties({tags: []}));
      });
// tags
// main tag
// oldUrls
    });
  });
});
