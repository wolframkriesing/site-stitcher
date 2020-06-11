import marked from 'marked';

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
/**
 * @param headingToken {marked.Tokens.Heading}
 * @return {string}
 */
export const renderHeadlineAsHtml = (headingToken) => {
  const asHtml = marked.parse(headingToken.text);
  return removeEnclosingPTag(asHtml);
};
/**
 * @param tokens {marked.Token[]}
 * @return {marked.Token[]}
 */
export const trimSpaceTokenFromEnd = (tokens) => {
  if (tokens[tokens.length - 1].type === 'space') {
    return tokens.slice(0, -1);
  }
  return tokens;
}
