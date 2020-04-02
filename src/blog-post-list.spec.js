import {describe, it} from 'mocha';
import assert from 'assert';
import {buildBlogPostListFromFiles, loadBlogPostList, BlogPost} from './blog-post-list.js';

describe('Build a list of posts and the intro paragraph', () => {
  describe('GIVEN a list of files', () => {
    it('WHEN empty THEN no posts are returned', () => {
      const blogPostingList = buildBlogPostListFromFiles([]);
      assert.deepStrictEqual(blogPostingList, []);
    });
    it('WHEN one file is given THEN return one BlogPost', () => {
      const file = '2018/05/13-post.md';
      const blogPosting = BlogPost.withDateCreated('2018-05-13');
      const blogPostingList = buildBlogPostListFromFiles([file]);
      assert.strictEqual(blogPostingList.length, 1);
      assert(blogPostingList[0].equals(blogPosting));
    });
    it('WHEN multiple files are given THEN return all BlogPost items', () => {
      const files = [
        '2010/01/01-post.md',
        '2011/02/28-post.md',
        '2012/12/31-post.md',
        '2018/10/13-post.md',
      ];
      const expectedBlogPostings = [
        BlogPost.withDateCreated('2010-01-01'),
        BlogPost.withDateCreated('2011-02-28'),
        BlogPost.withDateCreated('2012-12-31'),
        BlogPost.withDateCreated('2018-10-13'),
      ];
      const blogPostingList = buildBlogPostListFromFiles(files);
      assert.strictEqual(blogPostingList.length, 4);
      assert(blogPostingList[0].equals(expectedBlogPostings[0]));
      assert(blogPostingList[1].equals(expectedBlogPostings[1]));
      assert(blogPostingList[2].equals(expectedBlogPostings[2]));
      assert(blogPostingList[3].equals(expectedBlogPostings[3]));
    });
  });
  describe('GIVEN load the blog post preview data', () => {
    it('WHEN one file is given THEN return one BlogPost', async () => {
      const blogPostingList = [BlogPost.withDateCreated('2018-05-13')];
      const loadBlogPostingFromFile = async () => `# This is the first post
      
the first paragraph of the blog post ...
      `;
      const completeBlogPostingList = await loadBlogPostList({loadBlogPostingFromFile})(blogPostingList);

      assert.strictEqual(completeBlogPostingList.length, 1);
      const post = completeBlogPostingList[0];
      const expectedPost = new BlogPost({
        dateCreated: '2018-05-13',
        headline: 'This is the first post',
        abstract: 'the first paragraph of the blog post ...',
      });
      assert(post.equals(expectedPost));
    });
    it('WHEN many files are given THEN return all the BlogPost items', async () => {
      const blogPostingList = [
        BlogPost.withDateCreated('2018-05-13'),
        BlogPost.withDateCreated('2011-11-11'),
      ];
      const rawBlogPosting = {headline: 'headline', abstract: 'abstract'};
      const loadBlogPostingFromFile = async () => `# headline
      
abstract
      `;
      const completeBlogPostingList = await loadBlogPostList({loadBlogPostingFromFile})(blogPostingList);

      const expectedPosts = [
        new BlogPost({dateCreated: '2018-05-13', ...rawBlogPosting}),
        new BlogPost({dateCreated: '2011-11-11', ...rawBlogPosting}),
      ];
      assert.strictEqual(completeBlogPostingList.length, 2);
      assert(completeBlogPostingList[0].equals(expectedPosts[0]));
      assert(completeBlogPostingList[1].equals(expectedPosts[1]));
    });
  });
});