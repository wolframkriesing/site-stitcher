import {describe, it} from 'mocha';
import assert from 'assert';
import {buildBlogPostListFromFiles, loadBlogPostList, BlogPost} from './blog-post-list.js';

describe('Build a list of posts and the intro paragraph', () => {
  describe('GIVEN a list of files', () => {
    it('WHEN the list is empty THEN no posts are returned', () => {
      const blogPostList = buildBlogPostListFromFiles([], '');
      assert.deepStrictEqual(blogPostList, []);
    });
    it('WHEN one file is given THEN return one BlogPost', () => {
      const file = '2018/05/13-post.md';
      const blogPost = BlogPost.withDateCreated('2018-05-13');
      const blogPostList = buildBlogPostListFromFiles([file], '');
      assert.strictEqual(blogPostList.length, 1);
      assert(blogPostList[0].equals(blogPost));
    });
    it('WHEN multiple files are given THEN return all BlogPost items', () => {
      const files = [
        '2010/01/01-post.md',
        '2011/02/28-post.md',
        '2012/12/31-post.md',
        '2018/10/13-post.md',
      ];
      const expectedBlogPosts = [
        BlogPost.withDateCreated('2010-01-01'),
        BlogPost.withDateCreated('2011-02-28'),
        BlogPost.withDateCreated('2012-12-31'),
        BlogPost.withDateCreated('2018-10-13'),
      ];
      const blogPostList = buildBlogPostListFromFiles(files, '');
      assert.strictEqual(blogPostList.length, 4);
      assert(blogPostList[0].equals(expectedBlogPosts[0]));
      assert(blogPostList[1].equals(expectedBlogPosts[1]));
      assert(blogPostList[2].equals(expectedBlogPosts[2]));
      assert(blogPostList[3].equals(expectedBlogPosts[3]));
    });
  });
  describe('GIVEN a list of not-yet-loaded blog posts, load them', () => {
    it('WHEN one post is given THEN load one BlogPost completely', async () => {
      const blogPostList = [BlogPost.withDateCreated('2018-05-13')];
      const loadBlogPostFromFile = async () => `# This is the first post
      
the first paragraph of the blog post ...
      `;
      const completeBlogPostList = await loadBlogPostList({loadBlogPostFromFile})(blogPostList);

      assert.strictEqual(completeBlogPostList.length, 1);
      const post = completeBlogPostList[0];
      const expectedPost = new BlogPost({
        dateCreated: '2018-05-13',
        headline: 'This is the first post',
        abstract: 'the first paragraph of the blog post ...',
      });
      assert(post.equals(expectedPost));
    });
    it('WHEN many files are given THEN load all the BlogPost items', async () => {
      const blogPostList = [
        BlogPost.withDateCreated('2018-05-13'),
        BlogPost.withDateCreated('2011-11-11'),
      ];
      const rawBlogPost = {headline: 'headline', abstract: 'abstract'};
      const loadBlogPostFromFile = async () => `# headline
      
abstract
      `;
      const completeBlogPostList = await loadBlogPostList({loadBlogPostFromFile})(blogPostList);

      const expectedPosts = [
        new BlogPost({dateCreated: '2018-05-13', ...rawBlogPost}),
        new BlogPost({dateCreated: '2011-11-11', ...rawBlogPost}),
      ];
      assert.strictEqual(completeBlogPostList.length, 2);
      assert(completeBlogPostList[0].equals(expectedPosts[0]));
      assert(completeBlogPostList[1].equals(expectedPosts[1]));
    });
  });
});