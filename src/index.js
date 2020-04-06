import * as path from 'path';
import Tundra from 'tundrajs';
const tundra = new Tundra();

import {preloadBlogPostListFromDirectory} from './preload-blog-post.js';
import {loadBlogPostList} from './load-blog-post.js';
import {sortBlogPostListByDateCreated} from './sort-blog-post.js';

(async() => {
  const postsDirectory = path.join(__dirname, '../content/blog-posts');
  const posts = sortBlogPostListByDateCreated(
    await loadBlogPostList()(await preloadBlogPostListFromDirectory()(postsDirectory))
  );

  tundra.setBase(path.join(__dirname, 'templates'));
  const v = tundra.getRender('index.html', {posts});
  console.log(v);
})();

