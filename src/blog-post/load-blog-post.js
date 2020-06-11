import * as marked from 'marked';
import {BlogPost} from "./BlogPost.js";
import {readFile} from '../_deps/fs.js';
import {parseMetadata} from '../_shared/parse-metadata.js';
import {findNextParagraphTokens, renderAbstractAsHtml} from '../_shared/markdown.js';

const prodDeps = () => {
  return {readFile};
};

const findHeadlineAndAbstract = (tokens) => {
  let tokenIndex = 0;
  let headline = '';
  while (tokenIndex < tokens.length && headline === '') {
    const t = tokens[tokenIndex];
    if (t.type === 'heading' && t.depth === 1) headline = t.text;
    tokenIndex++;
  }
  const abstractTokens = findNextParagraphTokens(tokens.slice(tokenIndex));
  return {headline, abstractTokens};
}

const metadataParseConfigs = [
  {key: 'dateCreated', type: 'string'},
  {key: 'isDraft', type: 'boolean'},
  {key: 'oldUrls', type: 'array', separator: ' '},
  {key: 'tags', type: 'array', separator: ','},
  {key: 'videoStartTime', type: 'string'},
  {key: 'vimeoId', type: 'string'},
  {key: 'youtubeId', type: 'string'},
];
const parseRawPost = tokens => {
  const {headline, abstractTokens} = findHeadlineAndAbstract(tokens);
  const metadata = parseMetadata(tokens[0], metadataParseConfigs);
  const abstractAsHtml = renderAbstractAsHtml(abstractTokens);
  return {headline, abstractAsHtml, ...metadata};
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
