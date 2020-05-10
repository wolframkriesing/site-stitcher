import {describe, it} from 'mocha';
import {assertThat, containsString, matchesPattern, hasItem} from 'hamjest';
import {Tidbit} from "../load-tidbit/Tidbit.js";
import {renderAndWriteTidbitsIndexPage, renderAndWriteTidbitPage} from './render-page.js';

// TODO THIS is really ugly, that we have to inject that every time.
// Maybe intro a `DefaultRenderParameters.empty()` or something.
const renderParams = {navigationItems: [], groupedBlogPosts: {byTag: [], byMonth: []}, toReadableDate: () => {}};

describe('Render tidbits pages', () => {
  describe('GIVEN some tidbits WHEN rendering them', () => {
    /**
     * @param tidbits {Tidbit[]}
     * @return {Promise<string>}
     */
    const renderResult = async tidbits => {
      let writtenToFile = '';
      /**
       * @param filename {Filename}
       * @param content {string}
       * @return {Promise<void>}
       */
      const writeFile = async (filename, content) => { writtenToFile = content; };
      await renderAndWriteTidbitsIndexPage({writeFile})(tidbits, renderParams);
      return writtenToFile;
    };
    describe('THEN render the tidbits overview/index page', () => {
      it('AND render the headlines as H2', async () => {
        const writtenToFile = await renderResult([
          Tidbit.withRawData({headline: 'Tidbit1', tags: ['1st'], dateCreated: '2000-01-01 10:00 CET'}),
          Tidbit.withRawData({headline: 'Tidbit2', tags: ['1st'], dateCreated: '2000-01-01 10:00 CET'}),
          Tidbit.withRawData({headline: 'Tidbit3', tags: ['1st'], dateCreated: '2000-01-01 10:00 CET'}),
        ]);
        assertThat(writtenToFile, matchesPattern(/<h2 id="tidbit1">.*Tidbit1.*<\/h2>/gms));
        assertThat(writtenToFile, matchesPattern(/<h2 id="tidbit2">.*Tidbit2.*<\/h2>/gms));
        assertThat(writtenToFile, matchesPattern(/<h2 id="tidbit3">.*Tidbit3.*<\/h2>/gms));
      });
      it('AND renders the SPANs for the first tag AND the data-attribute renders the tag`s slug', async () => {
        const writtenToFile = await renderResult([
          Tidbit.withRawData({headline: 'irrelevant', tags: ['a11y'], dateCreated: '2000-01-01 10:00 CET'}),
          Tidbit.withRawData({headline: 'irrelevant', tags: ['one'], dateCreated: '2000-01-01 10:00 CET'}),
          Tidbit.withRawData({headline: 'irrelevant', tags: ['oh my god'], dateCreated: '2000-01-01 10:00 CET'}),
        ]);
        assertThat(writtenToFile, containsString('<span class="tag" data-tag="a11y">#a11y</span>'));
        assertThat(writtenToFile, containsString('<span class="tag" data-tag="one">#one</span>'));
        assertThat(writtenToFile, containsString('<span class="tag" data-tag="oh-my-god">#oh my god</span>'));
      });
      it('AND write to "/tidbits/index.html" (even when no tidbits are given, just make sure we write to the correct file)', async () => {
        /** @type Tidbit[] */
        const noTidbits = [];
        /** @type Filename[] */
        const writtenToFilenames = [];
        /**
         * @param filename {Filename}
         * @param _ {string}
         * @return {Promise<void>}
         */
        const writeFile = async (filename, _) => { writtenToFilenames.push(filename); };
        await renderAndWriteTidbitsIndexPage({writeFile})(noTidbits, renderParams);
        assertThat(writtenToFilenames, hasItem('/tidbits/index.html'));
      });
    });
    describe('THEN render a page per tidbit', () => {
      it('AND write one tidbit to "/tidbits/2000/01/a-tidbit/index.html"', async () => {
        const tidbits = [
          Tidbit.withRawData({headline: 'A Tidbit', dateCreated: '2000-01-01 10:00 CET', tags: []}),
        ];
        /** @type Filename[] */
        const writtenToFilenames = [];
        /**
         * @param filename {Filename}
         * @param _ {string}
         * @return {Promise<void>}
         */
        const writeFile = async (filename, _) => { writtenToFilenames.push(filename); };
        await renderAndWriteTidbitPage({writeFile})(tidbits, renderParams);
        assertThat(writtenToFilenames, hasItem('/tidbits/2000/01/a-tidbit/index.html'));
      });
      it('AND write a file per tidbit', async () => {
        const tidbits = [
          Tidbit.withRawData({headline: 'Tidbit 1', dateCreated: '2001-01-01 11:00 CET', tags: []}),
          Tidbit.withRawData({headline: 'Tidbit 2', dateCreated: '2002-02-01 12:00 CET', tags: []}),
          Tidbit.withRawData({headline: 'Tidbit 3', dateCreated: '2003-03-01 13:00 CET', tags: []}),
          Tidbit.withRawData({headline: 'Tidbit 4', dateCreated: '2004-04-01 14:00 CET', tags: []}),
        ];
        /** @type Filename[] */
        const writtenToFilenames = [];
        /**
         * @param filename {Filename}
         * @param _ {string}
         * @return {Promise<void>}
         */
        const writeFile = async (filename, _) => { writtenToFilenames.push(filename); };
        await renderAndWriteTidbitPage({writeFile})(tidbits, renderParams);
        assertThat(writtenToFilenames, hasItem('/tidbits/2001/01/tidbit-1/index.html'));
        assertThat(writtenToFilenames, hasItem('/tidbits/2002/02/tidbit-2/index.html'));
        assertThat(writtenToFilenames, hasItem('/tidbits/2003/03/tidbit-3/index.html'));
        assertThat(writtenToFilenames, hasItem('/tidbits/2004/04/tidbit-4/index.html'));
      });
    });
  });
});
