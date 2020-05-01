import marked from 'marked';
const defaultRenderer = new marked.Renderer();
const tidbitsRenderer = new marked.Renderer();
tidbitsRenderer.paragraph = (text) => {
  if (text.startsWith('tag: ')) {
    const tag = text.split('tag: ')[1].trim();
    return `<span class="tag" data-tag="${tag}">#${tag}</span>`;
  }
  return defaultRenderer.paragraph(text);
};
/**
 * NOTE: we are NOT using `marked.use()` since we dont want to override other rendering, since there seems now
 * `new Marked()` to exist.
 * @param {string} markdown
 * @return {string}
 */
export const tidbitMarkdownToHtml = (markdown) => {
  const tokens = marked.lexer(markdown);
  const tidbitHeadingWithTagIndex = tokens.map((token, index) => {
    if (token.type === 'paragraph' && token.text.startsWith('tag: ') && !token.text.includes('\n')) {
      const previousToken = tokens[index - 1];
      if (index > 0 && previousToken.type === 'heading' && previousToken.depth === 3) {
        return index - 1;
      }
    }
    return -1;
  }).filter(index => index !== -1);
  tidbitHeadingWithTagIndex.forEach(idx => { [tokens[idx + 1], tokens[idx]] = [tokens[idx], tokens[idx + 1]]; });
  return marked.parser(tokens, {...marked.defaults.renderer.options, renderer: tidbitsRenderer});
};
