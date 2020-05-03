import {describe, it} from 'mocha';
import * as assert from 'assert';
import {assertThat, instanceOf, hasProperties} from 'hamjest';
import {Tidbit} from './Tidbit.js';

import * as marked from 'marked';
import {parseMetadata} from '../_shared/parse-metadata.js';
import {renderAbstractAsHtml} from '../_shared/markdown.js';
/**
 * @param markdown {string}
 * @return {[Tidbit]}
 */
const loadTidbitFile = (markdown) => {
  /** @type {marked.TokensList} */
  const tokens = marked.lexer(markdown);
  /** @type {import("../_shared/parse-metadata").MetadataParseConfig[]} */
  const metadataParseConfigs = [
    {key: 'dateCreated', type: 'string'},
    {key: 'tags', type: 'array', separator: ','},
    {key: 'oldUrls', type: 'array', separator: ' '},
  ];
  /** @type {marked.TokensList} */
  const abstractTokens = /** @type {marked.TokensList} */ ([tokens[3]]);
  abstractTokens.links = tokens.links;
  const data = {
    headline: tokens[0].text,
    abstract: tokens[3].text,
    abstractAsHtml: renderAbstractAsHtml(abstractTokens),
    ...parseMetadata(tokens[1], metadataParseConfigs)
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
      it('THEN it has no oldUrls', () => {
        assertThat(load()[0], hasProperties({oldUrls: []}));
      });
      it('THEN can be rendered as an H2', () => {
        assert.strictEqual(load()[0].headlineAsHtml(2), '<h2 id="a-tidbit">A Tidbit</h2>\n');
      });
      it('THEN can be rendered as an H4', () => {
        assert.strictEqual(load()[0].headlineAsHtml(4), '<h4 id="a-tidbit">A Tidbit</h4>\n');
      });
    });
    describe('WHEN tidbit has a lot of data, not just the required ones', () => {
      const load = () => {
        const fileContent = [
          '# A Bigger Tidbit', '',
          'dateCreated: 2111-11-11 11:11 CET  ',
          'tags: nodejs, javascript, etc  ',
          'oldUrls: /blog/old/url/ /blog/old/url1/  ',
          '',
          'One paragraph',
          'with two lines and a [link][1].',
          '',
          '> and a blog quote',
          '> on many lines',
          '',
          '[1]: http://home.de',
        ].join('\n');
        return loadTidbitFile(fileContent);
      };
      describe('THEN find the metadata', () => {
        it('all the tags "nodejs, javascript, etc"', () => {
          assert.deepStrictEqual(load()[0].tags, ['nodejs', 'javascript', 'etc']);
        });
        it('oldUrls', () => {
          assert.deepStrictEqual(load()[0].oldUrls, ['/blog/old/url/', '/blog/old/url1/']);
        });
        it('abstract with a link-ref (not a direct link in the paragraph, but at the end of the section)', () => {
          assertThat(load()[0].abstractAsHtml,
            'One paragraph\n' +
            'with two lines and a <a href="http://home.de">link</a>.'
          );
        });
      });
    });
  });
});
