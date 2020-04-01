import {describe, it} from 'mocha';
import assert from 'assert';
import {buildBlogPostingListFromFiles, BlogPosting} from './blog-posting-list.js';

const loadBlogPostingList = ({loadBlogPostingFromFile}) => blogPostingList => {
  const rawBlogPostingData = loadBlogPostingFromFile();
  const blogPosting = blogPostingList[0];
  const newBlogPosting = new BlogPosting({
    dateCreated: blogPosting.dateCreated,
    ...rawBlogPostingData
  });
  return [newBlogPosting];
};

describe('Build a list of posts and the intro paragraph', () => {
  describe('GIVEN a list of files', () => {
    it('WHEN empty THEN no posts are returned', () => {
      const blogPostingList = buildBlogPostingListFromFiles([]);
      assert.deepStrictEqual(blogPostingList, []);
    });
    it('WHEN one file is given THEN return one BlogPosting', () => {
      const file = '2018/05/13-post.md';
      const blogPosting = BlogPosting.withDateCreated('2018-05-13');
      const blogPostingList = buildBlogPostingListFromFiles([file]);
      assert.strictEqual(blogPostingList.length, 1);
      assert(blogPostingList[0].equals(blogPosting));
    });
    it('WHEN multiple files are given THEN return all BlogPosting items', () => {
      const files = [
        '2010/01/01-post.md',
        '2011/02/28-post.md',
        '2012/12/31-post.md',
        '2018/10/13-post.md',
      ];
      const expectedBlogPostings = [
        BlogPosting.withDateCreated('2010-01-01'),
        BlogPosting.withDateCreated('2011-02-28'),
        BlogPosting.withDateCreated('2012-12-31'),
        BlogPosting.withDateCreated('2018-10-13'),
      ];
      const blogPostingList = buildBlogPostingListFromFiles(files);
      assert.strictEqual(blogPostingList.length, 4);
      assert(blogPostingList[0].equals(expectedBlogPostings[0]));
      assert(blogPostingList[1].equals(expectedBlogPostings[1]));
      assert(blogPostingList[2].equals(expectedBlogPostings[2]));
      assert(blogPostingList[3].equals(expectedBlogPostings[3]));
    });
  });
  describe('GIVEN load the blog posting preview data', () => {
    it('WHEN one file is given THEN return one BlogPosting', () => {
      const blogPostingList = [BlogPosting.withDateCreated('2018-05-13')];
      const rawBlogPosting = {
        headline: 'This is the first post',
        abstract: 'the first paragraph of the blog post ...'
      };
      const loadBlogPostingFromFile = () => rawBlogPosting;
      const completeBlogPostingList = loadBlogPostingList({loadBlogPostingFromFile})(blogPostingList);

      assert.strictEqual(completeBlogPostingList.length, 1);
      const post = completeBlogPostingList[0];
      const expectedPost = new BlogPosting({
        dateCreated: '2018-05-13',
        ...rawBlogPosting
      });
      assert(post.equals(expectedPost));
    });
  });
});