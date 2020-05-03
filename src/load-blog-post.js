import marked from 'marked';
import {BlogPost} from "./BlogPost.js";
import {readFile} from './_deps/fs.js';
import {parseMetadata} from './_shared/parse-metadata.js';

const prodDeps = () => {
  return {readFile};
};

/**
 * @param tokensList {marked.TokensList}
 * @return {[] | [marked.Token]}
 */
const findNextParagraphTokens = tokensList => {
  return tokensList
    .filter(t => t.type === 'paragraph')
    .slice(0, 1)
  ;
};

const findHeadlineAndAbstract = (tokensList) => {
  let tokenIndex = 0;
  let headline = '';
  while (tokenIndex < tokensList.length && headline === '') {
    const t = tokensList[tokenIndex];
    if (t.type === 'heading' && t.depth === 1) headline = t.text;
    tokenIndex++;
  }
  const abstractTokensList = findNextParagraphTokens(tokensList.slice(tokenIndex));
  abstractTokensList.links = tokensList.links;
  return {headline, abstractTokensList};
}

const removeEnclosingPTag = s => s
  .trim()
  .replace(/^<p>/, '')
  .replace(/<\/p>$/, '')
;
const renderAbstractContentAsHtml = (abstractTokensList) => {
  const abstractAsHtml = marked.parser(abstractTokensList);
  return removeEnclosingPTag(abstractAsHtml);
};
const metadataParseConfigs = [
  {key: 'dateCreated', type: 'string'},
  {key: 'oldUrls', type: 'array', separator: ' '},
  {key: 'tags', type: 'array', separator: ','},
  {key: 'videoStartTime', type: 'string'},
  {key: 'vimeoId', type: 'string'},
  {key: 'youtubeId', type: 'string'},
];
const parseRawPost = tokensList => {
  const {headline, abstractTokensList} = findHeadlineAndAbstract(tokensList);
  const metadata = parseMetadata(tokensList[0], metadataParseConfigs);
  const abstractContentAsHtml = renderAbstractContentAsHtml(abstractTokensList);
  return {headline, abstractContentAsHtml, ...metadata};
};
const findBodyToRender = tokensList => {
  // DANGER we are modifying `tokensList` here, since it has some properties, like `links`
  // set on the object, so it's not a pure array ... therefore we rather just shift() out
  // elements, instead of cloning it and may fuck up something else of marked's tokensList object.
  while (tokensList.length > 0) {
    if (tokensList[0].type === 'heading' && tokensList[0].depth === 1) {
      tokensList.shift();
      return;
    }
    tokensList.shift();
  }
}
const renderBodyAsHtml = tokensList => {
  findBodyToRender(tokensList);
  return marked.parser(tokensList);
}

export const loadManyBlogPosts = ({readFile} = prodDeps()) => async manySourceFiles => {
  const loadPost = loadBlogPost({readFile});
  return Promise.all(manySourceFiles.map(loadPost));
};

export const loadBlogPost = ({readFile}) => async (sourceFile) => {
  const rawPost = await readFile(sourceFile.filename);
  const tokensList = marked.lexer(rawPost);
  const parsedPostData = parseRawPost(tokensList);
  const bodyAsHtml = renderBodyAsHtml(tokensList);
  return BlogPost.withSourceFile(sourceFile, {...parsedPostData, bodyAsHtml})
}
