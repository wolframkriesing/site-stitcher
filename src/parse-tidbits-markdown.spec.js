import {describe, it} from 'mocha';
import {assertThat, not, containsString} from 'hamjest';

import marked from 'marked';
const defaultRenderer = new marked.Renderer();
const tidbitsRenderer = new marked.Renderer();
tidbitsRenderer.paragraph = (text) => {
  if (text.startsWith('tag: ')) {
    const tag = text.split('tag: ')[1];
    return `<span>#${tag}</span>`;
  }
  return defaultRenderer.paragraph(text);
};
/**
 * NOTE: we are NOT using `marked.use()` since we dont want to override other rendering, since there seems now
 * `new Marked()` to exist.
 * @param {string} markdown
 * @return {string}
 */
const tidbitMarkdownToHtml = (markdown) => {
  const tokens = marked.lexer(markdown);
  return new marked.Parser({renderer: tidbitsRenderer}).parse(tokens);
};

describe('A tidbits-markdown file has an H2 followed by a tag', () => {
  describe('GIVEN an H1 and H2 with a tag WHEN rendered', () => {
    const tidbitMarkdown = [
      '# H1 headline',
      '',
      '## A Tidbit',
      '',
      'tag: javascript',
      '',
      'tidbit content'
    ].join('\n');
    it('THEN render the tag like this <span>#tag</span> (and not the <p> anymore)', () => {
      const html = tidbitMarkdownToHtml(tidbitMarkdown);
      const tagHtml = '<span>#javascript</span>';
      assertThat(html, containsString(tagHtml));
      assertThat(html, not(containsString('<p>tag: javascript</p>')));
    });
      // const tidbitHeadlineHtml = '<h2 id="a-tidbit">A Tidbit</h2>';
  });
});
