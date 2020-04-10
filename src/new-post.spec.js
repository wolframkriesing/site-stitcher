import {describe, it} from 'mocha';
import assert from 'assert';
import {assertThat, hasProperties, instanceOf, endsWith} from 'hamjest';
import * as path from 'path';
import slugify from 'url-slug';
import {BlogPost} from "./BlogPost.js";

/**
 * @param {function(): Promise<string>} askUser
 * @returns {function(*): function(*): Promise<string>}
 */
const askForRequiredField = (askUser) => async (text) => {
  let headline;
  do {
    headline = await askUser(`${text}: `);
  } while (!headline);
  return headline;
}

/**
 * @typedef {{headline: string, abstract: string, tags: string[]}} RawBlogPostData
 * @param askUser
 * @returns {function(): function(): Promise<RawBlogPostData>}
 */
const collectBlogPostDataFromUser = ({askUser}) => async () => {
  const post = {};
  post.headline = await askForRequiredField(askUser)('Headline');
  post.abstract = await askForRequiredField(askUser)('Abstract');
  post.tags = (await askForRequiredField(askUser)('Tags')).split(',');
  return post;
};

/**
 * @param {RawBlogPostData} rawPostData
 * @return {function(): BlogPost}
 */
const enrichNewPostData = ({nowAsDateTimeString}) => (rawPost, blogPostRootDirectory) => {
  const dateCreated = nowAsDateTimeString();
  const pathFromDate = dateCreated.split(' ')[0].replace(/-/g, '/');
  const markdownFilename = path.join(blogPostRootDirectory, `${pathFromDate}-${slugify(rawPost.headline)}.md`);

  const post = new BlogPost();
  post.markdownFilename = markdownFilename;
  post.dateCreated = dateCreated;
  return post;
}
const blogPostToMarkdown = (post) => {
  const metadata = [
    'dateCreated: ' + post.dateCreated,
  ];
  if (post.tags) metadata.push('tags: ' + post.tags.join(', '));
  if (post.oldUrls) metadata.push('oldUrls: ' + post.oldUrls.join(' '));
  if (post.youtubeId) metadata.push('youtubeId: ' + post.youtubeId);
  if (post.vimeoId) metadata.push('vimeoId: ' + post.vimeoId);
  if (post.videoStartTime) metadata.push('videoStartTime: ' + post.videoStartTime);
  const markdown = [
    ...metadata.map(line => line + '  '),
    '',
    '# ' + post.headline
  ];
  if (post.abstract) {
    markdown.push('');
    markdown.push(post.abstract);
  }
  return markdown.join('\n');
}
const createMarkdownFileFromBlogPost = ({writeFile}) => async (post) => {
  return await writeFile(post.markdownFilename, blogPostToMarkdown(post));
}

describe('Script for creating a new blog post skeleton', () => {
  describe('GIVEN the user is asked for the data for a new post', () => {
    describe('WHEN asking the user to enter the data', () => {
      it('THEN ask for headline, abstract and tags', async () => {
        const questionsAsked = [];
        const answers = ['a headline', 'an abstract', 'tags'];
        const askUser = async question => { questionsAsked.push(question); return answers.shift(); };
        await collectBlogPostDataFromUser({askUser})();
        assert.deepStrictEqual(questionsAsked, ['Headline: ', 'Abstract: ', 'Tags: ']);
      });
      it('AND any is missing THEN ask until each is entered', async () => {
        const questionsAsked = [];
        const noAnswer = '';
        const answers = [noAnswer, 'a headline', noAnswer, noAnswer, 'an abstract', noAnswer, 'tags'];
        const askUser = async question => { questionsAsked.push(question); return answers.shift(); };
        await collectBlogPostDataFromUser({askUser})();
        assert.deepStrictEqual(questionsAsked, [
          'Headline: ', 'Headline: ',
          'Abstract: ', 'Abstract: ', 'Abstract: ',
          'Tags: ', 'Tags: ',
        ]);
      });
    });
    describe('WHEN data are entered', async () => {
      const postData = async () => {
        const answers = ['headline', 'abstract', 'tags'];
        const askUser = async q => answers.shift();
        return await collectBlogPostDataFromUser({askUser})();
      };
      it('WHEN data are entered THEN return them in the according property', async () => {
        assertThat(await postData(), hasProperties({headline: 'headline', abstract: 'abstract'}));
      });
      it('THEN tags are returns as array', async () => {
        assertThat(await postData(), hasProperties({tags: ['tags']}));
      });
    });
  });
  describe('GIVEN user-entered data for a new post make a proper `BlogPost` out of them', () => {
    it('WHEN enriching these data THEN add the current date as `dateCreated`', () => {
      const dateCreated = '2001-01-01 11:11 CET';
      const nowAsDateTimeString = () => dateCreated;
      const rawPostData = {headline: '', abstract: '', tags: []};
      const enriched = enrichNewPostData({nowAsDateTimeString})(rawPostData, '');
      assertThat(enriched, hasProperties({dateCreated}));
    });
    it('WHEN enriching data THEN set the `markdownFilename`', () => {
      const nowAsDateTimeString = () => '2001-01-01 11:11 CET';
      const blogPostRootDirectory = '/app/blog-posts'
      const rawPostData = {headline: 'headline', abstract: '', tags: []};
      const enriched = enrichNewPostData({nowAsDateTimeString})(rawPostData, blogPostRootDirectory);
      assertThat(enriched, hasProperties({markdownFilename: `${blogPostRootDirectory}/2001/01/01-headline.md`}));
    });
    it('WHEN the headline contains non-URL characters THEN sluggify and remove URL-incompatible once for `markdownFilename`', () => {
      const nowAsDateTimeString = () => '2001-01-01 11:11 CET';
      const headline = 'Übergänger 😀 and ❤ Maß é ñ️ ! @ # $ % ^ & * ( ) _ + = { } [ ] : ; " \' < > ? / , . \\ | Ende ';
      const rawPostData = {headline, abstract: '', tags: []};
      const enriched = enrichNewPostData({nowAsDateTimeString})(rawPostData, '');
      assertThat(enriched, hasProperties({markdownFilename: '2001/01/01-uberganger-and-mass-e-n-ende.md'}));
    });
    it('WHEN enriched THEN return a BlogPost instance', () => {
      const nowAsDateTimeString = () => '2001-01-01 11:11 CET';
      const rawPostData = {headline: 'headline', abstract: '', tags: []};
      const post = enrichNewPostData({nowAsDateTimeString})(rawPostData, '');
      assertThat(post, instanceOf(BlogPost));
    });
  });
  describe('GIVEN a proper `BlogPost` instance create markdown content', () => {
    const newPost = (headline = '') => {
      const post = BlogPost.preload('2000/01/01-post.md');
      post.headline = headline;
      return post;
    };
    it('WHEN the post has just a headline THEN write a one liner content', () => {
      const post = newPost('Post Headline');
      assertThat(blogPostToMarkdown(post), endsWith('# Post Headline'));
    });
    it('WHEN the post has just a headline+abstract THEN write them as content', () => {
      const post = newPost('Post Headline');
      post.abstract = 'A multi\nline\nabstract.';
      assertThat(blogPostToMarkdown(post), endsWith('# Post Headline\n\nA multi\nline\nabstract.'));
    });
    it('WHEN metadata `dateCreated` is given THEN add it to the top of the file with spaces at the end of the line', () => {
      const post = newPost('Post Headline');
      post.dateCreated = '2000-01-01 10:00 CET';
      const expected = [
        'dateCreated: 2000-01-01 10:00 CET  ',
        '',
        '# Post Headline'
      ];
      assert.strictEqual(blogPostToMarkdown(post), expected.join('\n'));
    });
    it('WHEN various metadata are given THEN add them all AND 2 spaces at end of each line', () => {
      const post = newPost('Post Headline');
      post.dateCreated = '2000-01-01 10:00 CET';
      post.tags = ['javascript', 'tdd', 'all that counts'];
      post.oldUrls = ['/blog/old', '/blog/old-2/'];
      post.youtubeId = '4223';
      post.vimeoId = '2342';
      post.videoStartTime = '123';
      const expected = [
        'dateCreated: 2000-01-01 10:00 CET  ',
        'tags: javascript, tdd, all that counts  ',
        'oldUrls: /blog/old /blog/old-2/  ',
        'youtubeId: 4223  ',
        'vimeoId: 2342  ',
        'videoStartTime: 123  ',
        '',
        '# Post Headline'
      ];
      assert.strictEqual(blogPostToMarkdown(post), expected.join('\n'));
    });
  });
  describe('GIVEN a `BlogPost` write the markdown file', () => {
    const newPost = () => BlogPost.preload('2000/01/01-post.md');
    it('WHEN writing succeeds THEN return true', async () => {
      const writeFile = async () => true;
      const write = createMarkdownFileFromBlogPost({writeFile});
      assert.strictEqual(await write(newPost()), true);
    });
    it('WHEN writing fails THEN return an Error', async () => {
      const writeFile = async () => new Error('Oh my God!');
      const write = createMarkdownFileFromBlogPost({writeFile});
      assertThat(await write(newPost()), instanceOf(Error));
    });
    it('WHEN writing THEN write the markdown content to the right file', async () => {
      const post = BlogPost.preload('2042/12/23-a-new-era.md');
      post.headline = 'A new Era!'
      let params = [];
      const writeFile = async (...args) => params = args;
      await createMarkdownFileFromBlogPost({writeFile})(post);
      const expectedContent = 'dateCreated: 2042-12-23  \n\n# A new Era!';
      assert.deepStrictEqual(params, [post.markdownFilename, expectedContent]);
    });
  });
});