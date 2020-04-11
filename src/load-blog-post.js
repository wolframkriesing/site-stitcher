import marked from 'marked';
import * as fs from 'fs';
import {BlogPost} from "./BlogPost.js";

const prodDeps = () => {
  const readFile = async (filename) => fs.promises.readFile(filename, 'utf8');
  return {readFile};
};

/**
 * @param {string[]} lines
 * @param {string} key
 * @returns {string}
 */
const findMetadataByKeyAsString = (lines, key) => {
  const prefix = key + ':';
  const foundLines = lines.filter(line => line.startsWith(prefix));
  if (foundLines.length === 0) return '';
  return foundLines[0].replace(prefix, '').trim();
};
/**
 * @param {string[]} lines
 * @param {string} key
 * @param {string} separator
 * @returns {string[]}
 */
const findMetadataByKeyAsArray = (lines, key, separator) => {
  const string = findMetadataByKeyAsString(lines, key)
  return string.split(separator).map(tag => tag.trim());
};
/**
 * @param tokens
 * @returns {BlogPostMetadata}
 */
const parseMetadata = (tokens) => {
  const metadata = {tags: [], oldUrls: []};
  if (tokens[0].type === 'paragraph') {
    const lines = tokens[0].text.split('\n');
    const dateCreated = findMetadataByKeyAsString(lines, 'dateCreated');
    if (dateCreated) metadata.dateCreated = dateCreated;
    metadata.tags = findMetadataByKeyAsArray(lines, 'tags', ',');
    metadata.oldUrls = findMetadataByKeyAsArray(lines, 'oldUrls', ' ');
    metadata.youtubeId = findMetadataByKeyAsString(lines, 'youtubeId');
    metadata.vimeoId = findMetadataByKeyAsString(lines, 'vimeoId');
    metadata.videoStartTime = findMetadataByKeyAsString(lines, 'videoStartTime');
  }
  return metadata;
}

const findHeadlineAndAbstract = (tokens) => {
  let tokenIndex = 0;
  let headline = '';
  while (tokenIndex < tokens.length && headline === '') {
    const t = tokens[tokenIndex];
    if (t.type === 'heading' && t.depth === 1) headline = t.text;
    tokenIndex++;
  }

  let abstract = '';
  let abstractToken = null;
  while (tokenIndex < tokens.length && abstract === '') {
    const t = tokens[tokenIndex];
    if (t.type === 'paragraph') {
      abstractToken = t;
      abstract = t.text;
    }
    tokenIndex++;
  }

  return {headline, abstract, abstractToken};
}

const removeEnclosingPTag = s => s
  .trim()
  .replace(/^<p>/, '')
  .replace(/<\/p>$/, '')
;
const renderAbstractContentAsHtml = (abstractToken, links) => {
  const renderableAbstract = [abstractToken];
  renderableAbstract.links = links;
  const abstractAsHtml = marked.parser(renderableAbstract);
  return removeEnclosingPTag(abstractAsHtml);
};
const parseRawPost = tokens => {
  const {headline, abstract, abstractToken} = findHeadlineAndAbstract(tokens);
  const metadata = parseMetadata(tokens);
  const abstractContentAsHtml = renderAbstractContentAsHtml(abstractToken, tokens.links);
  return {headline, abstract, abstractContentAsHtml, ...metadata};
};
const findBodyToRender = tokens => {
  // DANGER we are modifying `tokens` here, since it has some properties, like `links`
  // set on the object, so it's not a pure array ... therefore we rather just shift() out
  // elements, instead of cloning it and may fuck up something else of marked's tokens object.
  while (tokens.length > 0) {
    if (tokens[0].type === 'heading' && tokens[0].depth === 1) {
      tokens.shift();
      return;
    }
    tokens.shift();
  }
}
const renderBodyAsHtml = tokens => {
  findBodyToRender(tokens);
  return marked.parser(tokens);
}

export const loadBlogPostList = ({readFile} = prodDeps()) => async blogPostList => {
  const loadPost = loadBlogPost({readFile});
  return await Promise.all(blogPostList.map(async (blogPost) => await loadPost(blogPost)));
};

export const loadBlogPost = ({readFile}) => async (blogPost) => {
  const rawPost = await readFile(blogPost.markdownFilename);
  const tokens = marked.lexer(rawPost);
  const parsedPostData = parseRawPost(tokens);
  const bodyAsHtml = renderBodyAsHtml(tokens);
  const sourceFile = {filename: blogPost.markdownFilename};
  return BlogPost.withSourceFile(sourceFile, {...parsedPostData, bodyAsHtml})
}
