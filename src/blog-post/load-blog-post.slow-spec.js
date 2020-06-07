import {describe, it} from 'mocha';
import {assertThat, hasProperties} from 'hamjest';
import {loadManyBlogPostSourceFiles} from './load-blog-post-source-file.js';
import {loadManyBlogPosts} from './load-blog-post.js';
import * as path from 'path';

const blogPostsDirectory = path.join(__dirname, '../../test-content/blog-posts');

describe('Build posts from real files (tests are slow therefore)', () => {
  it('GIVEN one file WHEN loading works THEN return a complete BlogPost object', async () => {
    const sourceFiles = await loadManyBlogPostSourceFiles()(blogPostsDirectory);
    const posts = await loadManyBlogPosts()(sourceFiles);

    const expectedAbstract = `Abstract`;
    assertThat(posts[0], hasProperties({
      dateCreated: '2000-01-01',
      headline: 'Simplest Post',
      abstractAsHtml: expectedAbstract,
    }));
  });
});
