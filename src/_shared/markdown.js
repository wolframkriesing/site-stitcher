import * as marked from 'marked';

/**
 * @param t {marked.Token}
 * @return {boolean}
 */
const isParagraph = t => t.type === 'paragraph';
/**
 * @param tokensList {marked.Token[]}
 * @return {marked.Token[]}
 */
const findNextParagraphTokens = tokensList => {
  return tokensList
    .filter(isParagraph)
    .slice(0, 1)
  ;
};
/**
 * @param tokensAfterHeadline {marked.Token[]}
 * @param tokensList {marked.TokensList}
 * @return {marked.TokensList}
 */
export const nextParagraphAsTokensList = (tokensAfterHeadline, tokensList) => {
  const abstractTokensList = /** @type {marked.TokensList} */ (findNextParagraphTokens(tokensAfterHeadline));
  abstractTokensList.links = tokensList.links;
  return abstractTokensList;
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
 * @param abstractTokensList {marked.TokensList}
 * @return {string}
 */
export const renderAbstractAsHtml = (abstractTokensList) => {
  const abstractAsHtml = marked.parser(abstractTokensList);
  return removeEnclosingPTag(abstractAsHtml);
};
