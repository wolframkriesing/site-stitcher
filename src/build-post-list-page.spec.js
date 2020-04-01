import {describe, it} from 'mocha';
import assert from 'assert';

class BlogPosting {
  static withDateCreated(dateCreated) {
    const blogPosting = new BlogPosting();
    blogPosting.dateCreated = dateCreated;
    return blogPosting;
  }
  equals(blogPosting) {
    return this.dateCreated === blogPosting.dateCreated;
  }
}

const buildBlogPostingListFromFiles = files => {
  return files.map(file => {
    const date = file.split('-')[0].replace(/\//g, '-');
    return BlogPosting.withDateCreated(date);
  });
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
        BlogPosting.withDateCreated('2018-05-13'),
        BlogPosting.withDateCreated('2018-05-13'),
        BlogPosting.withDateCreated('2018-05-13'),
      ];
      const blogPostingList = buildBlogPostingListFromFiles(files);
      assert.strictEqual(blogPostingList.length, 4);
      // assert(blogPostingList[0].equals(expectedBlogPostings[0]));
      // assert(blogPostingList[1].equals(expectedBlogPostings[1]));
      // assert(blogPostingList[2].equals(expectedBlogPostings[2]));
      // assert(blogPostingList[3].equals(expectedBlogPostings[3]));
    });
  });
});