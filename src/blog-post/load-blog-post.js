import * as marked from 'marked';
import {BlogPost} from "./BlogPost.js";
import {readFile} from '../_deps/fs.js';
import {parseMetadata} from '../_shared/parse-metadata.js';
import {findNextParagraphTokens, renderAbstractAsHtml, renderHeadlineAsHtml} from '../_shared/markdown.js';

const prodDeps = () => {
  return {readFile};
};

const findHeadlineAndAbstract = (tokens) => {
  let tokenIndex = 0;
  let headlineTokens = [];
  while (tokenIndex < tokens.length && headlineTokens.length === 0) {
    const t = tokens[tokenIndex];
    if (t.type === 'heading' && t.depth === 1) headlineTokens = [t];
    tokenIndex++;
  }
  const abstractTokens = findNextParagraphTokens(tokens.slice(tokenIndex));
  return {headlineTokens, abstractTokens};
}

const metadataParseConfigs = [
  {key: 'canonicalUrl', type: 'string'},
  {key: 'canonicalHint', type: 'string'},
  {key: 'dateCreated', type: 'string'},
  {key: 'isDraft', type: 'boolean'},
  {key: 'oldUrls', type: 'array', separator: ' '},
  {key: 'tags', type: 'array', separator: ','},
  {key: 'previewImage', type: 'string'},
  {key: 'videoStartTime', type: 'string'},
  {key: 'vimeoId', type: 'string'},
  {key: 'youtubeId', type: 'string'},
];
const parseRawPost = tokens => {
  const {headlineTokens, abstractTokens} = findHeadlineAndAbstract(tokens);
  const metadata = parseMetadata(tokens[0], metadataParseConfigs);
  return {
    headline: headlineTokens[0].text,
    headlineAsHtml: renderHeadlineAsHtml(headlineTokens[0]),
    abstract: abstractTokens.length > 0 ? abstractTokens[0].text : '',
    abstractAsHtml: renderAbstractAsHtml(abstractTokens),
    ...metadata
  };
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
import {tokensToHtml} from '../_shared/more-html-markdown.js';
const renderBodyAsHtml = tokens => {
  findBodyToRender(tokens);
  return tokensToHtml(tokens);
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
