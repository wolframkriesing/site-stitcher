import marked from 'marked';

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

export const nextParagraphAsTokensList = (tokensAfterHeadline, tokensList) => {
  const abstractTokensList = findNextParagraphTokens(tokensAfterHeadline);
  abstractTokensList.links = tokensList.links;
  return abstractTokensList;
};

const removeEnclosingPTag = s => s
  .trim()
  .replace(/^<p>/, '')
  .replace(/<\/p>$/, '')
;
export const renderAbstractAsHtml = (abstractTokensList) => {
  const abstractAsHtml = marked.parser(abstractTokensList);
  return removeEnclosingPTag(abstractAsHtml);
};
