import assert from 'assert';
import {describe, it} from 'mocha';

import {buildBlogPostListFromFiles} from './preload-blog-post.js';
import {BlogPost} from './BlogPost.js';

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
});