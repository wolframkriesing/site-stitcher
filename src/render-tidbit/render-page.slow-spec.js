import {describe, it} from 'mocha';
import {assertThat, containsString, matchesPattern, hasItem} from 'hamjest';
import {Tidbit} from "../load-tidbit/Tidbit.js";
import {renderAndWriteTidbitsIndexPage, renderAndWriteTidbitPage} from './render-page.js';

// TODO THIS is really ugly, that we have to inject that every time.
// Maybe intro a `DefaultRenderParameters.empty()` or something.
const renderParams = {navigationItems: [], groupedBlogPosts: {byTag: [], byMonth: []}, toReadableDate: () => ''};

const defaultRawTidbitData = {
  abstractAsHtml: '',
  bodyAsHtml: '',
  hasAbstractOnly: false,
  headline: '',
  headlineAsHtml: '',
  tags: [''],
  dateCreated: '2000-01-01 10:00 CET',
  slug: '',
};
/**
 * @param overrideData {PlainObject}
 * @return {Tidbit}
 */
const createTidbit = (overrideData = {}) =>
  Tidbit.withRawData({...defaultRawTidbitData, ...overrideData});

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
          createTidbit({headlineAsHtml: 'Tidbit1'}),
          createTidbit({headlineAsHtml: 'Tidbit2'}),
          createTidbit({headlineAsHtml: 'Tidbit3'}),
        ]);
        assertThat(writtenToFile, matchesPattern(/<h2.*>.*Tidbit1.*<\/h2>/gms));
        assertThat(writtenToFile, matchesPattern(/<h2.*>.*Tidbit2.*<\/h2>/gms));
        assertThat(writtenToFile, matchesPattern(/<h2.*>.*Tidbit3.*<\/h2>/gms));
      });
      it('AND render the slug as the `id` attribute for the H2s', async () => {
        const writtenToFile = await renderResult([
          createTidbit({slug: 'tidbit-xyz'}),
        ]);
        assertThat(writtenToFile, matchesPattern(/<h2[^>]* id="tidbit-xyz"/gms));
      });
      it('AND render attribute `is=more-h2` for enhancing the H2 via the more-html component', async () => {
        const writtenToFile = await renderResult([createTidbit(),]);
        assertThat(writtenToFile, matchesPattern(/<h2[^>]* is="more-h2"/gms));
      });
      it('AND renders the first tag AND the data-attribute contains the tag`s slug', async () => {
        const writtenToFile = await renderResult([
          createTidbit({tags: ['a11y']}),
          createTidbit({tags: ['one']}),
          createTidbit({tags: ['oh my god']}),
        ]);
        assertThat(writtenToFile, containsString('<div class="tag" data-tag="a11y">#a11y</div>'));
        assertThat(writtenToFile, containsString('<div class="tag" data-tag="one">#one</div>'));
        assertThat(writtenToFile, containsString('<div class="tag" data-tag="oh-my-god">#oh my god</div>'));
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
          createTidbit({dateCreated: '2000-01-01 10:00 CET', slug: 'a-tidbit'}),
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
          createTidbit({dateCreated: '2001-01-01 11:00 CET', slug: 'tidbit-1'}),
          createTidbit({dateCreated: '2002-02-01 12:00 CET', slug: 'tidbit-2'}),
          createTidbit({dateCreated: '2003-03-01 13:00 CET', slug: 'tidbit-3'}),
          createTidbit({dateCreated: '2004-04-01 14:00 CET', slug: 'tidbit-4'}),
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
