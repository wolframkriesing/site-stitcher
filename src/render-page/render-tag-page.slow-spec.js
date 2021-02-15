import {describe, it} from '../test.js';
import {assertThat, containsString, hasItem, matchesPattern} from 'hamjest';
import {BlogPost} from "../blog-post/BlogPost.js";
import {renderAndWriteTagPages, forTesting} from "./render-tag-page.js";

// TODO THIS is really ugly, that we have to inject that every time.
// Maybe intro a `DefaultRenderParameters.empty()` or something.
const renderParams = {navigationItems: [], groupedArticles: {byTag: [], byMonth: []}};

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

/**
 * @param props {{tagSlug: Slug, articles: Article[], gradientWidthInPercent?: number, url?: string}}
 * @return {ArticlesGroupedByTag}
 */
const newGroup = ({tagSlug, articles, gradientWidthInPercent = 42, url = '/irrelevant'}) => {
  return {tagSlug, articles, gradientWidthInPercent, url};
};

describe('Render tag pages', () => {
  describe('GIVEN some blog posts that are already grouped by tag WHEN rendering them', () => {
    describe('THEN render a page per tag', () => {
      /**
       * @param groups {ArticlesGroupedByTag[]}
       * @return {Promise<string>}
       */
      const renderTagPage = async (groups = [newGroup({tagSlug: 'one', articles: [createBlogPost()]})]) => {
        /** @type string */
        let writtenToFile = '';
        /**
         * @param _ {Filename}
         * @param content {string}
         * @return {Promise<void>}
         */
        const writeFile = async (_, content) => { writtenToFile = content; };
        await renderAndWriteTagPages({writeFile, renderPage: forTesting.renderBlogPostTagPage})(groups, renderParams);
        return writtenToFile;
      };

      it('AND render the page headline H1', async () => {
        assertThat(await renderTagPage(), matchesPattern(/<h1.*>.*Tagged with #one.*<\/h1>/gms));
      });
      it('AND render the tag in the breadcrumb', async () => {
        assertThat(await renderTagPage(), matchesPattern(/<nav class="breadcrumb">.*Tag &raquo;.*#one.*<\/nav>/gms));
      });
      it('AND render the post`s headlines as H2', async () => {
        const groups = [
          newGroup({tagSlug: 'one', articles: [createBlogPost({headlineAsHtml: 'One tagged Blog-Post'})]}),
        ];
        const writtenToFile = await renderTagPage(groups);
        assertThat(writtenToFile, matchesPattern(/<h2.*>.*One tagged Blog-Post.*<\/h2>/gms));
      });
      it('AND renders "tagged with: #one #two" under the post', async () => {
        const groups = [
          newGroup({tagSlug: 'one', articles: [createBlogPost({tags: ['one', 'two']})]}),
        ];
        const writtenToFile = await renderTagPage(groups);
        assertThat(writtenToFile, containsString('tagged with:'));
        assertThat(writtenToFile, containsString('<a href="/tag/one/" class="tag">#one</a>'));
        assertThat(writtenToFile, containsString('<a href="/tag/two/" class="tag">#two</a>'));
      });
    });
  });
});
