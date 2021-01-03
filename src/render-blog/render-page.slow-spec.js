import {describe, it} from '../test.js';
import {assertThat, hasItem} from 'hamjest';
import {BlogPost} from "../blog-post/BlogPost.js";
import {renderAndWriteTagPages} from "./render-page.js";

// TODO THIS is really ugly, that we have to inject that every time.
// Maybe intro a `DefaultRenderParameters.empty()` or something.
const renderParams = {};

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
      it('AND write "one" tag`s page to "/blog/tag/one/index.html"', async () => {
        const groups = [
          {tagSlug: 'one', blogPosts: [createBlogPost()]}
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
    });
  });
});
