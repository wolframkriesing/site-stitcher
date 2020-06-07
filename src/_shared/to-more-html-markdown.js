import * as marked from 'marked';

const defaultRenderer = new marked.Renderer();
const moreHtmlRenderer = new marked.Renderer();

moreHtmlRenderer.heading = (...args) => {
  const [, level] = args;
  const heading = defaultRenderer.heading(...args);
  const headingStart = `<h${level} `;
  return heading.replace(headingStart, headingStart + `is="more-h${level}" `);
};

/**
 * NOTE: we are NOT using `marked.use()` since we dont want to override other rendering, since there seems now
 * `new Marked()` to exist.
 * @param {marked.Token[]} tokens
 * @return {string}
 */
export const tokensToHtml = (tokens) => {
  return new marked.Parser({renderer: moreHtmlRenderer}).parse(/** @type {marked.TokensList} */(tokens));
};
