import * as marked from 'marked';
import {tokensToHtml} from '../_shared/more-html-markdown.js';
import {readFile} from '../_deps/fs.js';
import {parseMetadata as _parseMetaData} from '../_shared/parse-metadata.js';
import {renderAbstractAsHtml, renderHeadlineAsHtml, trimSpaceTokenFromEnd} from '../_shared/markdown.js';
import {sortByDateCreatedDescending} from './sort-tidbit.js';
import {Tidbit} from './Tidbit.js';

/**
 * @typedef {import("../_shared/parse-metadata").MetadataParseConfig} MetadataParseConfig
 * @typedef {import('./Tidbit').TidbitMetadata} TidbitMetadata
 * @typedef {import("./TidbitSourceFile").TidbitSourceFile} TidbitSourceFile
 * @typedef {import('marked').Token} Token
 * @typedef {import('marked').Tokens.Heading} Heading
 * @typedef {import('marked').Tokens.Paragraph} Paragraph
 */

const prodDeps = () => {
  return {readFile};
};

/** @type {MetadataParseConfig[]} */
const metadataParseConfigs = [
  {key: 'dateCreated', type: 'string'},
  {key: 'tags', type: 'array', separator: ','},
  {key: 'oldUrls', type: 'array', separator: ' '},
  {key: 'previewImage', type: 'string'},
  {key: 'slug', type: 'string'},
];
/**
 * @param token {Token}
 * @return TidbitMetadata
 */
const parseMetadata = (token) => {
  return /** @type TidbitMetadata */(_parseMetaData(token, metadataParseConfigs));
}
/**
 * @param tokens {Token[]}
 * @return {Tidbit}
 */
const parseTidbitTokens = tokens => {
  const abstractTokens = [tokens[3]];
  const bodyTokens = trimSpaceTokenFromEnd(tokens.slice(3));
  const headlineToken = /** @type {Heading} */ (tokens[0]);
  const headlineText = headlineToken.text;
  const abstractToken = /** @type {Paragraph} */ (abstractTokens[0]);
  const abstractText = abstractToken.text;
  const data = {
    headline: headlineText,
    headlineAsHtml: renderHeadlineAsHtml(headlineToken),
    abstract: abstractText,
    abstractAsHtml: renderAbstractAsHtml(abstractTokens),
    ...parseMetadata(tokens[1]),
    bodyAsHtml: tokensToHtml(bodyTokens),
    hasAbstractOnly: bodyTokens.length === 1,
  };
  const tidbit = Tidbit.withRawData(data);
  return tidbit;
};
/**
 * @param t {Token}
 * @return {boolean}
 */
const isH1 = t => t.type === 'heading' && t.depth === 1;
/**
 * @param markdown {string}
 * @return {Tidbit[]}
 */
export const loadTidbitFile = (markdown) => {
  const tokens = marked.lexer(markdown);
  const indexesWhereTidbitsStart = tokens
    .map((t, idx) => isH1(t) ? idx : -1)
    .filter(idx => idx !== -1)
  ;
  return indexesWhereTidbitsStart.map((value, idx) => {
    if (tokens.length >= idx + 1) {
      return parseTidbitTokens(tokens.slice(value, indexesWhereTidbitsStart[idx + 1]));
    }
    return parseTidbitTokens(tokens.slice(value));
  });
}
/**
 * @param prodDeps {{readFile: function(Filename): Promise<string>}}
 * @return {function(TidbitSourceFile[]): Promise<Tidbit[]>}
 */
export const loadTidbits = ({readFile} = prodDeps()) => async (sourceFiles) => {
  return (await Promise.allSettled(sourceFiles.map(f => readFile(f.filename))))
    .map(settledPromise => {
      if (settledPromise.status === 'fulfilled')
        return loadTidbitFile(settledPromise.value);
      return []; // TODO we really need a `Result` here!!!
    })
    .flat()
    .sort(sortByDateCreatedDescending)
  ;
}
