import * as path from 'path';
import marked from 'marked';
import Tundra from 'tundrajs';
import * as fs from 'fs';

const tundra = new Tundra();

import {loadManyBlogPostSourceFiles} from './load-blog-post-source-file.js';
import {loadManyBlogPosts} from './load-blog-post.js';
import {sortByDateCreatedDescending} from './sort-blog-post.js';

import {toReadableDate, toWeekday} from './date.js';
const toReadableDateTime = s => s;


const navigationItems = [
  {path: '/', name: 'Home'},
  {path: '/about', name: 'About'},
];
const defaultRenderParams = {
  navigationItems,
  toReadableDateTime,
  toReadableDate,
  toWeekday,
};

tundra.setBase(path.join(__dirname, 'templates'));

const generatePost = async (post) => {
  const destDir = path.join(__dirname, '../_output', post.url);
  await fs.promises.mkdir(destDir, {recursive: true});
  const destFilename = path.join(destDir, 'index.html');
  const renderedFile = tundra.getRender('post.html', {...defaultRenderParams, post});
  await fs.promises.writeFile(destFilename, renderedFile);
  console.log("Built ", destFilename);
}

const generateAboutPage = async () => {
  const destDir = path.join(__dirname, '../_output', 'about');
  const contentDir = path.join(__dirname, '../content');
  await fs.promises.mkdir(destDir, {recursive: true});
  const destFilename = path.join(destDir, 'index.html');
  const content = marked(await fs.promises.readFile(path.join(contentDir, 'about.md'), 'utf8'));
  const renderedFile = tundra.getRender('about.html', {...defaultRenderParams, content});
  await fs.promises.writeFile(destFilename, renderedFile);
  console.log("Built ", destFilename);
}

const generateHomePage = async (posts) => {
  const renderedFile = tundra.getRender('index.html', {...defaultRenderParams, posts});
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
  ]).catch(err => {
    console.error(err);
    process.exit(-1);
  });
})();
