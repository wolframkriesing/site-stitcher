import {describe, it} from 'mocha';
import * as assert from 'assert';
import {assertThat, instanceOf, hasProperties} from 'hamjest';
import {Tidbit} from './Tidbit.js';
import {loadTidbitFile, loadTidbits} from './load-tidbit.js';
import {TidbitSourceFile} from "./TidbitSourceFile.js";

describe('Load a tidbit file (one month)', () => {
  describe('GIVEN one tidbit in it', () => {
    describe('WHEN tidbit has all required data (headline, slug, dateCreated, paragraph)', () => {
      const load = () => {
        const fileContent = [
          '# A Tidbit',
          '',
          'slug: a-custom-tidbit  ',
          'dateCreated: 2111-11-11 11:11 CET  ',
          '',
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
      it('THEN it has the headlineAsHtml "A Tidbit"', () => {
        assertThat(load()[0].headlineAsHtml, 'A Tidbit');
      });
      it('THEN it has the dateCreated = 2111-11-11 11:11 CET', () => {
        assertThat(load()[0].dateCreated, '2111-11-11 11:11 CET');
      });
      it('THEN it has the url = /tidbits/2111/11/a-tidbit/', () => {
        assertThat(load()[0].url, '/tidbits/2111/11/a-custom-tidbit/');
      });
      it('THEN it has the slug = a-tidbit', () => {
        assertThat(load()[0].slug, 'a-custom-tidbit');
      });
      it('THEN it has the abstractAsHtml = "One paragraph"', () => {
        assertThat(load()[0].abstractAsHtml, 'One paragraph');
      });
      it('THEN it has not tags', () => {
        assertThat(load()[0], hasProperties({tags: []}));
      });
      it('THEN it has no oldUrls', () => {
        assertThat(load()[0], hasProperties({oldUrls: []}));
      });
      it('THEN get the content as rendered, via `bodyAsHtml`', () => {
        assert.strictEqual(load()[0].bodyAsHtml, '<p>One paragraph</p>\n');
      });
    });
    describe('WHEN tidbit has a lot of data, not just the required ones', () => {
      const load = () => {
        const fileContent = [
          '# A Bigger Tidbit', '',
          'dateCreated: 2111-11-11 11:11 CET  ',
          'tags: nodejs, JAVA script, etc  ',
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
        it('all the tags "nodejs, JAVA script, etc" AND their slug', () => {
          assert.deepStrictEqual(load()[0].tags, [
            {value: 'nodejs', slug: 'nodejs'}, {value: 'JAVA script', slug: 'java-script'}, {value: 'etc', slug: 'etc'}]);
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
      it('THEN get the content as rendered, via `bodyAsHtml`', () => {
        const expected = [
          '<p>One paragraph',
          'with two lines and a <a href="http://home.de">link</a>.</p>',
          '<blockquote>',
          '<p>and a blog quote',
          'on many lines</p>',
          '</blockquote>',
          ''
        ].join('\n');
        assert.strictEqual(load()[0].bodyAsHtml, expected);
      });
    });
    describe('WHEN tidbit has some special edge case data', () => {
      it('AND the headline contains code THEN render it as HTML', () => {
        const fileContent = [
          '# A piece of `code`',
          '',
          'slug: irrelevant  ',
          'dateCreated: 2111-11-11 11:11 CET  ',
          '',
          'irrelevant'
        ].join('\n');
        const tidbit = loadTidbitFile(fileContent)[0];
        assert.strictEqual(tidbit.headlineAsHtml, 'A piece of <code>code</code>');
      });
    });
  });
  describe('GIVEN many tidbits in on file', () => {
    const load = () => {
      const fileContent = [
        '# Tidbit One',
        '',
        'dateCreated: 2111-11-11 11:11 CET',
        '',
        'One [paragraph][pcstt]',
        '',
        '# Tidbit Two',
        '',
        'dateCreated: 2222-12-12 22:22 CET  ',
        'tags: one, two',
        '',
        'Two paragraph',
        '',
        '[pcstt]: http://picostitch.com',
        '# Tidbit Three',
        'dateCreated: 3333-03-03 03:03 CET  ',
        '',
        'Three paragraph `code`',
      ].join('\n');
      return loadTidbitFile(fileContent);
    };
    it('THEN find all headlines', () => {
      const tidbits = load();
      assert.strictEqual(tidbits[0].headline, 'Tidbit One');
      assert.strictEqual(tidbits[1].headline, 'Tidbit Two');
      assert.strictEqual(tidbits[2].headline, 'Tidbit Three');
    });
    it('THEN find each metadata', () => {
      const tidbits = load();
      assert.strictEqual(tidbits[0].dateCreated, '2111-11-11 11:11 CET');
      assert.strictEqual(tidbits[1].dateCreated, '2222-12-12 22:22 CET');
      assert.strictEqual(tidbits[2].dateCreated, '3333-03-03 03:03 CET');
      assert.deepStrictEqual(tidbits[1].tags, [{value: 'one', slug: 'one'}, {value: 'two', slug: 'two'}]);
    });
    it('THEN find all `bodyAsHtml`', () => {
      const tidbits = load();
      assert.strictEqual(tidbits[0].bodyAsHtml, '<p>One <a href="http://picostitch.com">paragraph</a></p>\n');
      assert.strictEqual(tidbits[1].bodyAsHtml, '<p>Two paragraph</p>\n');
      assert.strictEqual(tidbits[2].bodyAsHtml, '<p>Three paragraph <code>code</code></p>\n');
    });
    it('WHEN tidbits have only one paragraph THEN provide `hasAbstractOnly=true`', () => {
      const fileContent = [
        '# Tidbit',
        'dateCreated: 2111-11-11 11:11 CET',
        '',
        'One paragraph',
        '',
        '# Tidbit',
        'dateCreated: 2111-11-11 11:11 CET',
        '',
        'One paragraph',
        '',
      ].join('\n');
      const tidbits = loadTidbitFile(fileContent);
      assertThat(tidbits[0], hasProperties({hasAbstractOnly: true}));
      assertThat(tidbits[1], hasProperties({hasAbstractOnly: true}));
    });
    it('WHEN tidbit has only more than one paragraph THEN provide `hasAbstractOnly=false`', () => {
      const fileContent = [
        '# Tidbit',
        'dateCreated: 2111-11-11 11:11 CET',
        '',
        'One paragraph',
        '',
        'Two paragraph',
        '',
        '# Tidbit 2',
        'dateCreated: 2111-11-11 11:11 CET',
        '',
        'One paragraph',
        '',
        'Two paragraph',
        '',
      ].join('\n');
      const tidbits = loadTidbitFile(fileContent);
      assertThat(tidbits[0], hasProperties({hasAbstractOnly: false}));
      assertThat(tidbits[1], hasProperties({hasAbstractOnly: false}));
    });
  });
});

describe('Load many tidbit files (many months)', () => {
  describe('GIVEN many files with many tidbits inside WHEN successfully loading them', () => {
    it('THEN all loaded tidbits are sorted newest first', async () => {
      const fakeSourceFiles = [
        TidbitSourceFile.withFilename('tidbits/2000/01/index.md'),
        TidbitSourceFile.withFilename('tidbits/2222/01/index.md'),
      ];
      /**
       * @type {{[key: string]: string}}
       */
      const fileContents = {
        'tidbits/2000/01/index.md': '# Tidbit 2000\ndateCreated: 2000-01-01 10:00 CET\n\nparagraph\n',
        'tidbits/2222/01/index.md':
          '# Tidbit 2222-1\ndateCreated: 2222-01-22 22:22 CET\n\nparagraph\n' +
          '# Tidbit 2222-2\ndateCreated: 3333-01-22 22:22 CET\n\nparagraph\n'
      };
      /**
       * @param filename {Filename}
       * @return {Promise<string>}
       */
      const readFile = async (filename) => fileContents[filename];
      const tidbits = await loadTidbits({readFile})(fakeSourceFiles);

      assert.strictEqual(tidbits[0].dateCreated, '3333-01-22 22:22 CET');
      assert.strictEqual(tidbits[1].dateCreated, '2222-01-22 22:22 CET');
      assert.strictEqual(tidbits[2].dateCreated, '2000-01-01 10:00 CET');
    });
  });
});
