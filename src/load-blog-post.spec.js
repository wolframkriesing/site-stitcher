import {describe, it} from 'mocha';
import assert from 'assert';
import {loadBlogPostList} from './load-blog-post.js';
import {BlogPost} from './BlogPost.js';

describe('GIVEN a list of not-yet-loaded blog posts, load them', () => {
  it('WHEN one post is given THEN load one BlogPost completely', async () => {
    const blogPostList = [BlogPost.withDateCreated('2018-05-13')];
    const loadBlogPostFromFile = async () => '# This is the first post\nthe first paragraph of the blog post ...';
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
    const loadBlogPostFromFile = async () => '# headline\nabstract';
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
