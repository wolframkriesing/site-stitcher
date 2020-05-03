import * as marked from 'marked';
import {readFile} from '../_deps/fs.js';
import {parseMetadata} from '../_shared/parse-metadata.js';
import {renderAbstractAsHtml} from '../_shared/markdown.js';
import {Tidbit} from './Tidbit.js';

/**
 * @param sourceFiles {import("./TidbitSourceFile").TidbitSourceFile[]}
 * @return {Promise<Tidbit[]>}
 */
export const loadTidbits = async (sourceFiles) => {
  await readFile(sourceFiles[0].filename);
  const data = {
    // url: '/tidbit/2000/01/a-tidbit/',
    dateCreated: '2000-01-01 10:00 CET',
    // sourceFilename: '/app/test-content/tidbit/2000/01/index.md',
    headline: 'A Tidbit',
    abstractAsHtml: 'This tidbit has ONLY the required data.',
  };
  return [Tidbit.withRawData(data)];
}
/** @type {import("../_shared/parse-metadata").MetadataParseConfig[]} */
const metadataParseConfigs = [
  {key: 'dateCreated', type: 'string'},
  {key: 'tags', type: 'array', separator: ','},
  {key: 'oldUrls', type: 'array', separator: ' '},
];
/**
 * @param tokens {marked.TokensList}
 * @return {Tidbit}
 */
const parseTidbitTokens = tokens => {
  const abstractTokens = /** @type {marked.TokensList} */ ([tokens[3]]);
  abstractTokens.links = tokens.links;
  const bodyTokens = /** @type {marked.TokensList} */ (tokens.slice(3));
  bodyTokens.links = tokens.links;
  const data = {
    headline: tokens[0].text,
    abstractAsHtml: renderAbstractAsHtml(abstractTokens),
    ...parseMetadata(tokens[1], metadataParseConfigs),
    bodyAsHtml: marked.parser(bodyTokens),
  };
  const tidbit = Tidbit.withRawData(data);
  return tidbit;
};
/**
 * @param markdown {string}
 * @return {[Tidbit]}
 */
export const loadTidbitFile = (markdown) => {
  /** @type {marked.TokensList} */
  const tokens = marked.lexer(markdown);
  const tidbit = parseTidbitTokens(tokens);
  const tidbits = [tidbit];
  if (tokens.filter(t => t.type === 'heading').length === 2) {
    tidbits.push({headline: 'Tidbit Two'});
  }
  return tidbits;
}
