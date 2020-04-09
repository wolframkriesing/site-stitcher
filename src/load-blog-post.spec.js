import {describe, it} from 'mocha';
import assert from 'assert';
import {loadBlogPostList, loadBlogPost} from './load-blog-post.js';
import {BlogPost} from './BlogPost.js';

describe('Load a blog post completely, with all data ready to render', () => {
  it('GIVEN a post with headline and first paragraph THEN load and find: dateCreated, markdownFilename, headline and abstract', async () => {
    const preloadedPost = BlogPost.preload('2001/01/01-post.md');
    const loadBlogPostFromFile = async () => '# This is the first post\nthe first paragraph of the blog post ...';
    const post = await loadBlogPost({loadBlogPostFromFile})(preloadedPost);

    const expectedPost = new BlogPost({
      dateCreated: '2001-01-01',
      markdownFilename: '2001/01/01-post.md',
      headline: 'This is the first post',
      abstract: 'the first paragraph of the blog post ...',
    });
    assert(post.equals(expectedPost));
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

  describe('GIVEN finding the abstract in the blog post', () => {
    it('WHEN it has no first paragraph THEN set abstract=""', async () => {
      const blogPostList = [BlogPost.preload('2001/01/01-post.md')];
      const loadBlogPostFromFile = async () => '# headline';
      const loadedBlogPostList = await loadBlogPostList({loadBlogPostFromFile})(blogPostList);
      assert.strictEqual(loadedBlogPostList[0].abstract, '');
    });
    it('WHEN the headline is not followed by a paragraph, but e.g. another headline THEN set abstract=""', async () => {
      const blogPostList = [BlogPost.preload('2001/01/01-post.md')];
      const loadBlogPostFromFile = async () => '# headline\n## subheadline';
      const loadedBlogPostList = await loadBlogPostList({loadBlogPostFromFile})(blogPostList);
      assert.strictEqual(loadedBlogPostList[0].abstract, '');
    });
    it('WHEN it has metadata, headline and an abstract THEN find the abstract', async () => {
      const blogPostList = [BlogPost.preload('2001/01/01-post.md')];
      const loadBlogPostFromFile = async () => 'meta: data\n\n# headline\nabstract, yeah';
      const loadedBlogPostList = await loadBlogPostList({loadBlogPostFromFile})(blogPostList);
      assert.strictEqual(loadedBlogPostList[0].abstract, 'abstract, yeah');
    });
  });

  xdescribe('GIVEN finding the metadata in a blog post', () => {
    it('WHEN it has none THEN none are set (no dateCreated, no author, no tags, ...)', async () => {
    });
  });
});
