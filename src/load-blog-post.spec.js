import {describe, it} from 'mocha';
import assert from 'assert';
import {loadBlogPostList} from './load-blog-post.js';
import {BlogPost} from './BlogPost.js';

describe('GIVEN a list of not-yet-loaded blog posts, load them', () => {
  it('WHEN one post is given THEN load one BlogPost completely', async () => {
    const blogPostList = [BlogPost.withMarkdownFilename('2018/05/13-post.md')];
    const loadBlogPostFromFile = async () => '# This is the first post\nthe first paragraph of the blog post ...';
    const completeBlogPostList = await loadBlogPostList({loadBlogPostFromFile})(blogPostList);

    assert.strictEqual(completeBlogPostList.length, 1);
    const post = completeBlogPostList[0];
    const expectedPost = new BlogPost({
      dateCreated: '2018-05-13',
      markdownFilename: '2018/05/13-post.md',
      headline: 'This is the first post',
      abstract: 'the first paragraph of the blog post ...',
    });
    assert(post.equals(expectedPost));
  });
  it('WHEN many files are given THEN load all the BlogPost items', async () => {
    const blogPostList = [
      BlogPost.withMarkdownFilename('2018/05/13-post.md'),
      BlogPost.withMarkdownFilename('2011/11/11-post.md'),
    ];
    const rawBlogPost = {headline: 'headline', abstract: 'abstract'};
    const loadBlogPostFromFile = async () => '# headline\nabstract';
    const completeBlogPostList = await loadBlogPostList({loadBlogPostFromFile})(blogPostList);

    const expectedPosts = [
      new BlogPost({markdownFilename: '2018/05/13-post.md', ...rawBlogPost}),
      new BlogPost({markdownFilename: '2011/11/11-post.md', ...rawBlogPost}),
    ];
    assert.strictEqual(completeBlogPostList.length, 2);
    assert(completeBlogPostList[0].equals(expectedPosts[0]));
    assert(completeBlogPostList[1].equals(expectedPosts[1]));
  });

  describe('GIVEN finding the abstract in the blog post', () => {
    it('WHEN it has no first paragraph THEN set abstract=""', async () => {
      const blogPostList = [BlogPost.withMarkdownFilename('2001/01/01-post.md')];
      const loadBlogPostFromFile = async () => '# headline';
      const loadedBlogPostList = await loadBlogPostList({loadBlogPostFromFile})(blogPostList);
      assert.strictEqual(loadedBlogPostList[0].abstract, '');
    });
    it('WHEN the headline is not followed by a paragraph, e.g. a headline THEN set abstract=""', async () => {
      const blogPostList = [BlogPost.withMarkdownFilename('2001/01/01-post.md')];
      const loadBlogPostFromFile = async () => '# headline\n## subheadline';
      const loadedBlogPostList = await loadBlogPostList({loadBlogPostFromFile})(blogPostList);
      assert.strictEqual(loadedBlogPostList[0].abstract, '');
    });
  });
});
