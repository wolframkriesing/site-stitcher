import * as marked from 'marked';

/**
 * @param t {marked.Token}
 * @return {boolean}
 */
const isParagraph = t => t.type === 'paragraph';
/**
 * @param tokens {marked.Token[]}
 * @return {marked.Token[]}
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
 * @param abstractTokens {marked.Token[]}
 * @return {string}
 */
export const renderAbstractAsHtml = (abstractTokens) => {
  const abstractAsHtml = marked.parser(/** @type {marked.TokensList} */(abstractTokens));
  return removeEnclosingPTag(abstractAsHtml);
};
