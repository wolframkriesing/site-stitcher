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
export const collectBlogPostDataFromUser = ({askUser}) => async () => {
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
export const enrichNewPostData = ({nowAsDateTimeString}) => (rawPost, blogPostRootDirectory) => {
  const dateCreated = nowAsDateTimeString();
  const pathFromDate = dateCreated.split(' ')[0].replace(/-/g, '/');
  const markdownFilename = path.join(blogPostRootDirectory, `${pathFromDate}-${slugify(rawPost.headline)}.md`);

  const post = new BlogPost();
  post.markdownFilename = markdownFilename;
  post.dateCreated = dateCreated;
  return post;
}
export const blogPostToMarkdown = (post) => {
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
export const createMarkdownFileFromBlogPost = ({writeFile}) => async (post) => {
  return await writeFile(post.markdownFilename, blogPostToMarkdown(post));
}
