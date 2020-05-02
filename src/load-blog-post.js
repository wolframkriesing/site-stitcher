import marked from 'marked';
import {BlogPost} from "./BlogPost.js";
import {readFile} from './_deps/fs.js';

const prodDeps = () => {
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
  const string = findMetadataByKeyAsString(lines, key).trim();
  if (string.length === 0) return [];
  return string.split(separator).map(s => s.trim());
};
/**
 * @param tokens
 * @returns {BlogPostMetadata}
 */
const parseMetadata = (token) => {
  const metadata = {tags: [], oldUrls: []};
  if (token.type === 'paragraph') {
    const lines = token.text.split('\n');
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
  const abstractTokens = [];
  abstractTokens.links = tokens.links;
  while (tokenIndex < tokens.length && abstract === '') {
    const t = tokens[tokenIndex];
    if (t.type === 'paragraph') {
      abstractTokens.push(t);
      abstract = t.text;
    }
    tokenIndex++;
  }

  return {headline, abstract, abstractTokens};
}

const removeEnclosingPTag = s => s
  .trim()
  .replace(/^<p>/, '')
  .replace(/<\/p>$/, '')
;
const renderAbstractContentAsHtml = (abstractTokens) => {
  const abstractAsHtml = marked.parser(abstractTokens);
  return removeEnclosingPTag(abstractAsHtml);
};
const parseRawPost = tokens => {
  const {headline, abstract, abstractTokens} = findHeadlineAndAbstract(tokens);
  const metadata = parseMetadata(tokens[0]);
  const abstractContentAsHtml = renderAbstractContentAsHtml(abstractTokens);
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

export const loadManyBlogPosts = ({readFile} = prodDeps()) => async manySourceFiles => {
  const loadPost = loadBlogPost({readFile});
  return Promise.all(manySourceFiles.map(loadPost));
};

export const loadBlogPost = ({readFile}) => async (sourceFile) => {
  const rawPost = await readFile(sourceFile.filename);
  const tokens = marked.lexer(rawPost);
  const parsedPostData = parseRawPost(tokens);
  const bodyAsHtml = renderBodyAsHtml(tokens);
  return BlogPost.withSourceFile(sourceFile, {...parsedPostData, bodyAsHtml})
}
