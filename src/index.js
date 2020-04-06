import * as path from 'path';
import Tundra from 'tundrajs';
const tundra = new Tundra();

import {preloadBlogPostListFromDirectory} from './preload-blog-post.js';
import {loadBlogPostList} from './load-blog-post.js';
import {sortByDateCreatedDescending} from './sort-blog-post.js';

import {toReadableDate, toWeekday} from './date.js';

(async() => {
  const postsDirectory = path.join(__dirname, '../content/blog-posts');
  const posts = (
    await loadBlogPostList()(await preloadBlogPostListFromDirectory()(postsDirectory))
  ).sort(sortByDateCreatedDescending);

  tundra.setBase(path.join(__dirname, 'templates'));
  const v = tundra.getRender('index.html', {posts, toReadableDate, toWeekday});
  console.log(v);
})();

