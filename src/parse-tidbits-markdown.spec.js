import {describe, it} from 'mocha';
import {assertThat, not, containsString, equalTo} from 'hamjest';

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
  const [heading, tagParagraph] = [tokens[1], tokens[2]];
  tokens[1] = tagParagraph;
  tokens[2] = heading;
  return marked.parser(tokens, {...marked.defaults.renderer.options, renderer: tidbitsRenderer});
};

describe('A tidbits-markdown file has an H2 followed by a tag', () => {
  it('GIVEN tidbit parser works THEN dont break the default markdown parser', () => {
    assertThat(marked('## Not a Tidbit'), equalTo('<h2 id="not-a-tidbit">Not a Tidbit</h2>\n'));
    assertThat(marked('tag: looks like a tidbit'), equalTo('<p>tag: looks like a tidbit</p>\n'));
  });
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
    it('THEN renders the SPAN before the H2', () => {
      const html = tidbitMarkdownToHtml(tidbitMarkdown);
      const headingHtml = '<h2 id="a-tidbit">A Tidbit</h2>';
      const tagHtml = '<span>#javascript</span>';
      assertThat(html, containsString(tagHtml + headingHtml));
    });
  });
});
