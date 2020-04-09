import {describe, it} from 'mocha';
import assert from 'assert';
import {assertThat, hasProperties} from 'hamjest';
import {loadBlogPost, loadBlogPostList} from './load-blog-post.js';
import {BlogPost} from './BlogPost.js';

describe('Load a blog post completely, with all data ready to render', () => {
  describe('GIVEN a valid post', () => {
    const loadPost = async (params) => {
      const defaults = {fileContent: '', markdownFilename: '2001/01/01-post.md'};
      const {fileContent, markdownFilename} = {...defaults, ...params};
      const preloadedPost = BlogPost.preload(markdownFilename);
      const loadBlogPostFromFile = async () => fileContent;
      return await loadBlogPost({loadBlogPostFromFile})(preloadedPost);
    };
    it('WHEN post has headline and first paragraph THEN load and find: dateCreated, markdownFilename, headline and abstract', async () => {
      const post = await loadPost({
        markdownFilename: '2001/01/01-post.md',
        fileContent: '# This is the first post\nthe first paragraph of the blog post ...'
      });
      const expectedProps = {
        dateCreated: '2001-01-01',
        markdownFilename: '2001/01/01-post.md',
        headline: 'This is the first post',
        abstract: 'the first paragraph of the blog post ...',
      };
      assertThat(post, hasProperties(expectedProps));
    });
    it('WHEN it has no first paragraph THEN set abstract=""', async () => {
      const post = await loadPost({fileContent: '# headline'});
      assert.strictEqual(post.abstract, '');
    });
    it('WHEN the headline is not followed by a paragraph, but e.g. another headline THEN set abstract=""', async () => {
      const post = await loadPost({fileContent: '# headline\n## subheadline'});
      assert.strictEqual(post.abstract, '');
    });
    describe('WHEN it has metadata', async () => {
      it('AND headline and an abstract THEN find the headline and the abstract', async () => {
        const post = await loadPost({fileContent: 'meta: data\n\n# headline\nabstract, yeah'});
        assertThat(post, hasProperties({headline: 'headline', abstract: 'abstract, yeah'}));
      });
      xit('WHEN it has the metadata `dateCreated` THEN set the property accordingly', async () => {
        const dateCreated = '2001-01-01 01:01 CET';
        const post = await loadPost({fileContent: `dateCreated: ${dateCreated}\n\n# headline\nabstract, yeah`});
        assert.strictEqual(post.dateCreated, dateCreated);
      });
    });
  });
});

describe('GIVEN a list of not-yet-loaded blog posts, load them', () => {
  xit('WHEN loading one post', () => {
    assert.strictEqual(completeBlogPostList.length, 1);
  });
  it('WHEN many files are given THEN load all the BlogPost items', async () => {
    const blogPostList = [
      BlogPost.preload('2018/05/13-post.md'),
      BlogPost.preload('2011/11/11-post.md'),
    ];
    const rawBlogPost = {headline: 'headline', abstract: 'abstract'};
    const loadBlogPostFromFile = async () => '# headline\nabstract';
    const completeBlogPostList = await loadBlogPostList({loadBlogPostFromFile})(blogPostList);

    const expectedPosts = [
      BlogPost.preload('2018/05/13-post.md').cloneAndOverrideWith(rawBlogPost),
      BlogPost.preload('2011/11/11-post.md').cloneAndOverrideWith(rawBlogPost),
    ];
    assert.strictEqual(completeBlogPostList.length, 2);
    assert(completeBlogPostList[0].equals(expectedPosts[0]));
    assert(completeBlogPostList[1].equals(expectedPosts[1]));
  });
});
