import {describe, it} from '../src/test.js';
import {assertThat, not, containsString, hasSize} from 'hamjest';
import {renderString_forTesting} from '../src/_deps/render-template.js';

const tpl = `
{% import "_macros.njk" as parts %}
{{ parts.tagsNav(topTags, alphabeticallySortedTags) }}
`
const render = (data) => renderString_forTesting(tpl, data);

const createTag = (overrides) => {
  return {
    gradientWidthInPercent: 0,
    tagSlug: '',
    url: '',
    ...overrides,
  };
}

describe('macro: tagsNav - used to render a list of top and alphabetically sorted tags', () => {
  it('WHEN given two empty lists of tags THEN render no <li>', () => {
    const html = render({topTags: [], alphabeticallySortedTags: []});
    assertThat(html, not(containsString('<li')));
  });
  it('WHEN there is one top tag THEN render one <li> and the link with the slug inside', () => {
    const tag = createTag({tagSlug: 'one', url: ''});
    const html = render({topTags: [tag], alphabeticallySortedTags: []});
    assertThat(html, containsString('<li'));
    assertThat(html, containsString('<a href="">#one</a>'));
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
    assertThat('Found <li>B</li> NOT (ONLY) once', html.split('<li>B</li>'), hasSize(2));
  });
  it('WHEN only top tags are given THEN show NO headline-letter', () => {
    const tag = createTag({tagSlug: 'one', url: ''});
    const html = render({topTags: [tag], alphabeticallySortedTags: []});
    assertThat(html, not(containsString('<li>O</li>')));
  });
});