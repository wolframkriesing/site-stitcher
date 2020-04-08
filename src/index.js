import * as path from 'path';
import Tundra from 'tundrajs';
const tundra = new Tundra();

import {preloadBlogPostListFromDirectory} from './preload-blog-post.js';
import {loadBlogPostList} from './load-blog-post.js';
import {sortByDateCreatedDescending} from './sort-blog-post.js';

import {toReadableDate, toWeekday} from './date.js';

tundra.setBase(path.join(__dirname, 'templates'));

import * as fs from 'fs';
import marked from 'marked';
const generatePost = (post) => {
  const destDir = path.join(__dirname, '../_output', post.url);
  fs.mkdirSync(destDir, {recursive: true});
  const destFilename = path.join(destDir, 'index.html');
  const postHtml = marked(fs.readFileSync(post.markdownFilename, 'utf8'));
  const renderedFile = tundra.getRender('post.html', {post, postHtml});
  fs.writeFileSync(destFilename, renderedFile);
console.log("Built ", destFilename);
}

(async() => {
  const postsDirectory = path.join(__dirname, '../content/blog-posts');
  const posts = (
    await loadBlogPostList()(await preloadBlogPostListFromDirectory()(postsDirectory))
  ).sort(sortByDateCreatedDescending);

  posts.forEach(generatePost);

  const renderedFile = tundra.getRender('index.html', {posts, toReadableDate, toWeekday});
  const destFilename = path.join(__dirname, '../_output', 'index.html');
  fs.writeFileSync(destFilename, renderedFile);
console.log("Built ", destFilename);
})();

