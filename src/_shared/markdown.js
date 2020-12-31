import * as marked from 'marked';

/**
 * @typedef {import('marked').Token} Token
 * @typedef {import('marked').Tokens.Heading} Heading
 * @typedef {import('marked').TokensList} TokensList
 */

/**
 * @param t {Token}
 * @return {boolean}
 */
const isParagraph = t => t.type === 'paragraph';
/**
 * @param tokens {Token[]}
 * @return {Token[]}
 */
export const findNextParagraphTokens = tokens => {
  return tokens
    .filter(isParagraph)
    .slice(0, 1)
  ;
};
/**
 * @param s {string}
 * @return {string}
 */
const removeEnclosingPTag = s => s
  .trim()
  .replace(/^<p>/, '')
  .replace(/<\/p>$/, '')
;
/**
 * @param abstractTokens {Token[]}
 * @return {string}
 */
export const renderAbstractAsHtml = (abstractTokens) => {
  const abstractAsHtml = marked.parser(/** @type {TokensList} */(abstractTokens));
  return removeEnclosingPTag(abstractAsHtml);
};
/**
 * @param headingToken {Heading}
 * @return {string}
 */
export const renderHeadlineAsHtml = (headingToken) => {
  const asHtml = marked.parse(headingToken.text);
  return removeEnclosingPTag(asHtml);
};
/**
 * @param tokens {Token[]}
 * @return {Token[]}
 */
export const trimSpaceTokenFromEnd = (tokens) => {
  if (tokens[tokens.length - 1].type === 'space') {
    return tokens.slice(0, -1);
  }
  return tokens;
}
