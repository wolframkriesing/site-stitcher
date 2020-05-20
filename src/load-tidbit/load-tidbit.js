import * as marked from 'marked';
import {readFile} from '../_deps/fs.js';
import {parseMetadata} from '../_shared/parse-metadata.js';
import {renderAbstractAsHtml, trimSpaceTokenFromEnd} from '../_shared/markdown.js';
import {sortByDateCreatedDescending} from './sort-tidbit.js';
import {Tidbit} from './Tidbit.js';

const prodDeps = () => {
  return {readFile};
};

/** @type {import("../_shared/parse-metadata").MetadataParseConfig[]} */
const metadataParseConfigs = [
  {key: 'dateCreated', type: 'string'},
  {key: 'tags', type: 'array', separator: ','},
  {key: 'oldUrls', type: 'array', separator: ' '},
  {key: 'slug', type: 'string'},
];
/**
 * @param tokens {marked.Token[]}
 * @return {Tidbit}
 */
const parseTidbitTokens = tokens => {
  const abstractTokens = [tokens[3]];
  const bodyTokens = trimSpaceTokenFromEnd(tokens.slice(3));
  const data = {
    headline: /** @type {marked.Tokens.Heading} */ (tokens[0]).text,
    abstractAsHtml: renderAbstractAsHtml(abstractTokens),
    ...parseMetadata(tokens[1], metadataParseConfigs),
    bodyAsHtml: marked.parser(/** @type {marked.TokensList} */(bodyTokens)),
    hasAbstractOnly: bodyTokens.length === 1,
  };
  const tidbit = Tidbit.withRawData(data);
  return tidbit;
};
/**
 * @param t {marked.Token}
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
 * @return {function(import("./TidbitSourceFile").TidbitSourceFile[]): Promise<Tidbit[]>}
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
