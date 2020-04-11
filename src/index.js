import * as path from 'path';
import Tundra from 'tundrajs';
const tundra = new Tundra();

import {loadManyBlogPostSourceFiles} from './load-blog-post-source-file.js';
import {loadManyBlogPosts} from './load-blog-post.js';
import {sortByDateCreatedDescending} from './sort-blog-post.js';

import {toReadableDate, toWeekday} from './date.js';
const toReadableDateTime = s => s;

tundra.setBase(path.join(__dirname, 'templates'));

import * as fs from 'fs';
const generatePost = async (post) => {
  const destDir = path.join(__dirname, '../_output', post.url);
  await fs.promises.mkdir(destDir, {recursive: true});
  const destFilename = path.join(destDir, 'index.html');
  const renderedFile = tundra.getRender('post.html', {post, toReadableDateTime});
  await fs.promises.writeFile(destFilename, renderedFile);
  console.log("Built ", destFilename);
}

const generateAboutPage = async () => {
  const destDir = path.join(__dirname, '../_output', 'about');
  await fs.promises.mkdir(destDir, {recursive: true});
  const destFilename = path.join(destDir, 'index.html');
  const renderedFile = tundra.getRender('about.html', {});
  await fs.promises.writeFile(destFilename, renderedFile);
  console.log("Built ", destFilename);
}

const generateHomePage = async (posts) => {
  const renderedFile = tundra.getRender('index.html', {posts, toReadableDate, toReadableDateTime, toWeekday});
  const destFilename = path.join(__dirname, '../_output', 'index.html');
  await fs.promises.writeFile(destFilename, renderedFile);
  console.log("Built ", destFilename);
};

(async() => {
  const postsDirectory = path.join(__dirname, '../content/blog-posts');
  const sourceFiles = await loadManyBlogPostSourceFiles()(postsDirectory);
  const posts = (await loadManyBlogPosts()(sourceFiles)).sort(sortByDateCreatedDescending);
  Promise.all([
    ...posts.map(generatePost),
    generateAboutPage(),
    generateHomePage(posts),
  ]);
})();
