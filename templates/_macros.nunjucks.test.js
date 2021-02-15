import {describe, it} from '../src/test.js';
import {assertThat, not, containsString, hasSize, matchesPattern} from 'hamjest';
import {renderString_forTesting} from '../src/_deps/render-template.js';

/**
 * @typedef {{gradientWidthInPercent: number, tagSlug: string, url: string}} TagToRenderInMacro
 */

const tpl = `
{% import "_macros.nunjucks" as parts %}
{{ parts.tagsNav(topTags, alphabeticallySortedTags) }}
`

/**
 * @param data {PlainObject}
 * @return {string}
 */
const render = (data) => renderString_forTesting(tpl, data);

/**
 * @param overrides {PlainObject}
 * @return {TagToRenderInMacro}
 */
const createTag = (overrides) => {
  return {
    gradientWidthInPercent: 0,
    tagSlug: '',
    url: '',
    ...overrides,
  };
}

describe('macro: `tagsNav` - renders top tags and alphabetically sorted tags', () => {
  it('WHEN there is one top tag THEN render a <li> and the link with the slug inside', () => {
    const tag = createTag({tagSlug: 'one', url: ''});
    const html = render({topTags: [tag], alphabeticallySortedTags: []});
    assertThat(html, matchesPattern(/<li [^>]*>\s*<a href="[^"]*">#one<\/a>\s*<\/li>/));
  });

  it('WHEN there is alphabetically sorted tag THEN add a <li with the starting letter before', () => {
    const tag = createTag({tagSlug: 'a tag', url: ''});
    const html = render({topTags: [], alphabeticallySortedTags: [tag]});
    assertThat(html, containsString('<li>A</li>'));
  });
  it('WHEN there are tags "a tag" and "b tag" THEN add the "headline" before each', () => {
    const tags = [
      createTag({tagSlug: 'a tag', url: ''}),
      createTag({tagSlug: 'b tag', url: ''}),
      createTag({tagSlug: 'b tag 1', url: ''}),
    ];
    const html = render({topTags: [], alphabeticallySortedTags: tags});
    assertThat(html, containsString('<li>A</li>'));
    assertThat(html, containsString('<li>B</li>'));
    assertThat('Expected <li>B</li> to exist once only', html.split('<li>B</li>'), hasSize(2));
  });
  it('WHEN only top tags are given THEN show NO headline-letter', () => {
    // This test is not ideal, because it tests for something to NOT exist.
    // Just add a space before or after the "O", it will render the same, be wrong but the
    // test wont fail :(.
    const tag = createTag({tagSlug: 'one', url: ''});
    const html = render({topTags: [tag], alphabeticallySortedTags: []});
    assertThat(html, not(matchesPattern(/<li [^>]*>O<\/li>/)));
  });
});