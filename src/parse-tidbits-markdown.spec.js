import {describe, it} from 'mocha';
import {assertThat, not, containsString, equalTo} from 'hamjest';
import marked from 'marked';
import {tidbitMarkdownToHtml} from './parse-tidbits-markdown.js';

describe('A tidbits-markdown file has an H2 followed by a tag', () => {
  it('GIVEN tidbit parser works THEN dont break the default markdown parser', () => {
    assertThat(marked('## Not a Tidbit'), equalTo('<h2 id="not-a-tidbit">Not a Tidbit</h2>\n'));
    assertThat(marked('tag: looks like a tidbit'), equalTo('<p>tag: looks like a tidbit</p>\n'));
  });
  describe('GIVEN an H1 and H2 with a tag WHEN rendered', () => {
    const tidbitMarkdown = [
      '# H1 headline',
      '## A Tidbit',
      'tag: javascript',
      '',
      'tidbit content',
    ].join('\n');
    it('THEN render the tag like this <span>#tag</span> (and not the <p> anymore)', () => {
      const html = tidbitMarkdownToHtml(tidbitMarkdown);
      const tagHtml = '<span class="tag" data-tag="javascript">#javascript</span>';
      assertThat(html, containsString(tagHtml));
      assertThat(html, not(containsString('<p>tag: javascript</p>')));
    });
    it('THEN renders the SPAN before the H2', () => {
      const html = tidbitMarkdownToHtml(tidbitMarkdown);
      const headingHtml = '<h2 id="a-tidbit">A Tidbit</h2>';
      const tagHtml = '<span class="tag" data-tag="javascript">#javascript</span>';
      assertThat(html, containsString(tagHtml + headingHtml));
    });
    it('THEN trim the tag when setting in `data-tag` attribute', () => {
      const html = tidbitMarkdownToHtml('tag: many words   ');
      const tagHtml = '<span class="tag" data-tag="many words">#many words</span>';
      assertThat(html, containsString(tagHtml));
    });
  });
  describe('GIVEN H1 and H2s without tags', () => {
    it('WHEN rendered THEN they are rendered as normal', () => {
      const normalMarkdown = [
        '# Heading 1',
        '## Heading 1.1',
        'paragraph 1.1',
        '## Heading 1.2',
        'paragraph 1.2',
      ].join('\n');
      assertThat(tidbitMarkdownToHtml(normalMarkdown), marked(normalMarkdown));
    });
  });
  describe('GIVEN multiple H2s with a tag WHEN rendered', () => {
    const tidbitMarkdown = [
      '# H1 headline',
      '## Tidbit 1',
      'tag: tag1',
      '',
      'tidbit 1 content',
      '## Tidbit 2',
      'tag: tag2',
      '',
      'tidbit 2 content',
    ].join('\n');
    it('THEN renders all SPANs before the H2s', () => {
      const html = tidbitMarkdownToHtml(tidbitMarkdown);

      const heading1Html = '<h2 id="tidbit-1">Tidbit 1</h2>';
      const tag1Html = '<span class="tag" data-tag="tag1">#tag1</span>';
      assertThat(html, containsString(tag1Html + heading1Html));

      const heading2Html = '<h2 id="tidbit-2">Tidbit 2</h2>';
      const tag2Html = '<span class="tag" data-tag="tag2">#tag2</span>';
      assertThat(html, containsString(tag2Html + heading2Html));
    });
  });
});
