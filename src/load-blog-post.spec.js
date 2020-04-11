import {describe, it} from 'mocha';
import assert from 'assert';
import {assertThat, hasProperties} from 'hamjest';
import {loadBlogPost, loadManyBlogPosts} from './load-blog-post.js';
import {BlogPost} from './BlogPost.js';

describe('Load a blog post completely, with all data ready to render', () => {
  describe('GIVEN a valid post', () => {
    const loadPost = async (params) => {
      const defaults = {fileContent: '', markdownFilename: '2001/01/01-post.md'};
      const {fileContent, markdownFilename} = {...defaults, ...params};
      const sourceFile = {filename: markdownFilename};
      const readFile = async () => fileContent;
      return await loadBlogPost({readFile})(sourceFile);
    };
    it('WHEN post has headline and first paragraph THEN load and find: url, dateCreated, markdownFilename, headline and abstract', async () => {
      const post = await loadPost({
        markdownFilename: '2001/01/01-post.md',
        fileContent: '# This is the first post\nthe first paragraph of the blog post ...'
      });
      const expectedProps = {
        url: '/blog/2001/01/01-post/',
        dateCreated: '2001-01-01',
        markdownFilename: '2001/01/01-post.md',
        headline: 'This is the first post',
        abstract: 'the first paragraph of the blog post ...',
      };
      assertThat(post, hasProperties(expectedProps));
    });
    it('WHEN source file is inside a directory THEN still get the URL right', async () => {
      const post = await loadPost({
        markdownFilename: '2001/01/01-post/index.md',
        fileContent: '# irrelevant'
      });
      assertThat(post, hasProperties({url: '/blog/2001/01/01-post/'}));
    });
    it('WHEN it has no first paragraph THEN set abstract=""', async () => {
      const post = await loadPost({fileContent: '# headline'});
      assert.strictEqual(post.abstract, '');
    });
    it('WHEN the headline is not followed by a paragraph, but e.g. another headline THEN set abstract=""', async () => {
      const post = await loadPost({fileContent: '# headline\n## subheadline'});
      assert.strictEqual(post.abstract, '');
    });
    it('WHEN it has NO metadata THEN the data set via metadata are either empty or have the right type', async () => {
      const post = await loadPost({fileContent: '# headline only'});
      assertThat(post, hasProperties({tags: [], oldUrls: []}));
    });
    describe('WHEN it has metadata', async () => {
      it('AND headline and an abstract THEN find the headline and the abstract', async () => {
        const post = await loadPost({fileContent: 'meta: data\n\n# headline\nabstract, yeah'});
        assertThat(post, hasProperties({headline: 'headline', abstract: 'abstract, yeah'}));
      });
      it('WHEN it has the metadata `dateCreated` THEN set the property accordingly', async () => {
        const dateCreated = '2001-01-01 01:01 CET';
        const post = await loadPost({fileContent: `dateCreated: ${dateCreated}\n\n# headline\nabstract, yeah`});
        assertThat(post, hasProperties({dateCreated}));
      });
      it('WHEN it has the metadata `tags` THEN set the property accordingly', async () => {
        const post = await loadPost({fileContent: `tags: tag1, tag2\n\n# headline\nabstract, yeah`});
        assertThat(post, hasProperties({tags: ['tag1', 'tag2']}));
      });
      it('WHEN it has no `dateCreated` THEN the original dateCreated from the preloaded post stays', async () => {
        const post = await loadPost({fileContent: `noDateCreated: :)\n\n# no dateCreated metadata`, markdownFilename: '2001/01/01-mmm.md'});
        assertThat(post, hasProperties({dateCreated: '2001-01-01'}));
      });
      it('WHEN it has `oldUrls` THEN provide them', async () => {
        const post = await loadPost({fileContent: 'oldUrls: /blog/old.html /blog/old1.html\n\n# headline'});
        assertThat(post, hasProperties({oldUrls: ['/blog/old.html', '/blog/old1.html']}));
      });
      it('WHEN it has `youtubeId` THEN provide it', async () => {
        const post = await loadPost({fileContent: 'youtubeId: 12345\n\n# headline'});
        assertThat(post, hasProperties({youtubeId: '12345', hasVideo: true}));
      });
      it('WHEN it has `vimeoId` THEN provide it', async () => {
        const post = await loadPost({fileContent: 'vimeoId: 12345\n\n# headline'});
        assertThat(post, hasProperties({vimeoId: '12345', hasVideo: true}));
      });
      it('WHEN it has `videoStartTime` THEN provide it', async () => {
        const post = await loadPost({fileContent: 'videoStartTime: 42\n\n# headline'});
        assertThat(post, hasProperties({videoStartTime: '42', hasVideo: false}));
      });
    });
    it('THEN provide `bodyAsHtml` without metadata and headline, etc.', async () => {
      const fileContent = 'tags: none\ndateCreated: 2000-01-01 10:00\n\n# headline\nfirst paragraph';
      const post = await loadPost({fileContent});
      assertThat(post, hasProperties({bodyAsHtml: '<p>first paragraph</p>\n'}));
    });
    it('THEN provide `abstractContentAsHtml` for previewing posts', async () => {
      const fileContent = [
        '# headline',
        '1st paragraph with [a link][1]',
        '',
        '2nd paragraph should not be rendered',
        '',
        '[1]: http://picostitch.com'
      ].join('\n');
      const post = await loadPost({fileContent});
      const expected = '1st paragraph with <a href="http://picostitch.com">a link</a>';
      assertThat(post, hasProperties({abstractContentAsHtml: expected}));
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
    const readFile = async () => '# headline\nabstract';
    const completeBlogPostList = await loadManyBlogPosts({readFile})(blogPostList);

    const expectedPosts = [
      BlogPost.preload('2018/05/13-post.md').cloneAndOverrideWith(rawBlogPost),
      BlogPost.preload('2011/11/11-post.md').cloneAndOverrideWith(rawBlogPost),
    ];
    assert.strictEqual(completeBlogPostList.length, 2);
    assert(completeBlogPostList[0].equals(expectedPosts[0]));
    assert(completeBlogPostList[1].equals(expectedPosts[1]));
  });
});
