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
  if (files.length === 1) {
    const date = files[0].split('-')[0].replace(/\//g, '-');
    return [BlogPosting.withDateCreated(date)];
  }
  return [];
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
  });
});