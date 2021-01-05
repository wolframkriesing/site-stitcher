import {describe, it} from '../test.js';
import {assertThat, containsString, hasItem, matchesPattern} from 'hamjest';
import {BlogPost} from "../blog-post/BlogPost.js";
import {renderAndWriteTagPages} from "./render-page.js";

// TODO THIS is really ugly, that we have to inject that every time.
// Maybe intro a `DefaultRenderParameters.empty()` or something.
const renderParams = {navigationItems: [], groupedBlogPosts: {byTag: [], byMonth: []}};

const defaultRawBlogPostData = {
  abstract: '',
  abstractAsHtml: '',
  bodyAsHtml: '',
  hasAbstractOnly: false,
  headline: '',
  headlineAsHtml: '',
  previewImage: '',
  tags: [''],
  dateCreated: '2000-01-01 10:00 CET',
  slug: '',
  markdownFilename: '2000/01/01-one.md',
};
/**
 * @param overrideData {PlainObject}
 * @return {BlogPost}
 */
const createBlogPost = (overrideData = {}) => {
  return BlogPost.withRawData({...defaultRawBlogPostData, ...overrideData});
}

describe('Render blog pages', () => {
  describe('GIVEN some blog posts WHEN rendering them', () => {
    describe('THEN render a page per tag', () => {
      /**
       * @param groups {ArticlesGroupedByTag[]}
       * @return {Promise<string>}
       */
      const renderTagPage = async (groups = [{tagSlug: 'one', blogPosts: [createBlogPost()], gradientWidthInPercent: 100}]) => {
        /** @type string */
        let writtenToFile = '';
        /**
         * @param _ {Filename}
         * @param content {string}
         * @return {Promise<void>}
         */
        const writeFile = async (_, content) => { writtenToFile = content; };
        await renderAndWriteTagPages({writeFile})(groups, renderParams);
        return writtenToFile;
      };

      it('AND write "one" tag`s page to "/blog/tag/one/index.html"', async () => {
        const groups = [
          {tagSlug: 'one', blogPosts: [createBlogPost()], gradientWidthInPercent: 100}
        ];
        /** @type Filename[] */
        const writtenToFilenames = [];
        /**
         * @param filename {Filename}
         * @param _ {string}
         * @return {Promise<void>}
         */
        const writeFile = async (filename, _) => { writtenToFilenames.push(filename); };
        await renderAndWriteTagPages({writeFile})(groups, renderParams);
        assertThat(writtenToFilenames, hasItem('/blog/tag/one/index.html'));
      });
      it('AND render the page headline H1', async () => {
        assertThat(await renderTagPage(), matchesPattern(/<h1.*>.*Tagged with #one.*<\/h1>/gms));
      });
      it('AND render the tag in the breadcrumb', async () => {
        assertThat(await renderTagPage(), matchesPattern(/<nav class="breadcrumb">.*Tag &raquo;.*#one.*<\/nav>/gms));
      });
      it('AND render the post`s headlines as H2', async () => {
        const groups = [
          {tagSlug: 'one', blogPosts: [createBlogPost({headlineAsHtml: 'One tagged Blog-Post'})], gradientWidthInPercent: 100}
        ];
        const writtenToFile = await renderTagPage(groups);
        assertThat(writtenToFile, matchesPattern(/<h2.*>.*One tagged Blog-Post.*<\/h2>/gms));
      });
      it('AND renders "tagged with: #one #two" under the post', async () => {
        const groups = [
          {tagSlug: 'one', blogPosts: [createBlogPost({tags: ['one', 'two']})], gradientWidthInPercent: 100},
        ];
        const writtenToFile = await renderTagPage(groups);
        assertThat(writtenToFile, containsString('tagged with: #one #two'));
      });
    });
  });
});

