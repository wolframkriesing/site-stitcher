import * as path from 'path';
import marked from 'marked';
import Tundra from 'tundrajs';
import * as fs from 'fs';

const tundra = new Tundra();

import {loadManyBlogPostSourceFiles} from './load-blog-post-source-file.js';
import {loadManyBlogPosts} from './load-blog-post.js';
import {sortByDateCreatedDescending} from './sort-blog-post.js';
import {groupBlogPostsByTag} from './group-blog-posts-by-tags.js';

import {toReadableDate, toWeekday} from './date.js';


const navigationItems = [
  {path: '/', name: 'Home'},
  {path: '/about', name: 'About'},
];
const defaultRenderParams = {
  navigationItems,
  toReadableDate,
  toWeekday,
};

tundra.setBase(path.join(__dirname, 'templates'));

const generate301Page = async (oldPath, newPath) => {
  const destDir = path.join(__dirname, '../_output', oldPath);
  await fs.promises.mkdir(destDir, {recursive: true});
  const destFilename = path.join(destDir, 'index.html');
  const renderedFile = tundra.getRender('301.html', {...defaultRenderParams, redirectUrl: newPath});
  await fs.promises.writeFile(destFilename, renderedFile);
  console.log("Built 301 page ", destFilename);
}

const generate301Pages = (post) => {
  if (post.oldUrls.length > 0) {
    return Promise.all(post.oldUrls.map(oldUrl => generate301Page(oldUrl, post.url)));
  }
}

const generate404Page = async (posts) => {
  const destDir = path.join(__dirname, '../_output');
  await fs.promises.mkdir(destDir, {recursive: true});
  const destFilename = path.join(destDir, '404.html');
  const renderedFile = tundra.getRender('404.html', {...defaultRenderParams, posts});
  await fs.promises.writeFile(destFilename, renderedFile);
  console.log("Built 404 page ", destFilename);
}

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

const generateTagPage = async (group) => {
  const tag = group.tag;
  const destDir = path.join(__dirname, '../_output', 'blog/tag', tag);
  await fs.promises.mkdir(destDir, {recursive: true});
  const destFilename = path.join(destDir, 'index.html');
  const renderedFile = tundra.getRender('tag.html', {...defaultRenderParams, tag, posts: group.blogPosts});
  await fs.promises.writeFile(destFilename, renderedFile);
  console.log("Built ", destFilename);
};

const generateTagPages = async (postGroups) => {
  return Promise.all(postGroups.map(generateTagPage));
};

(async() => {
  const postsDirectory = path.join(__dirname, '../content/blog-posts');
  const sourceFiles = await loadManyBlogPostSourceFiles()(postsDirectory);
  const posts = (await loadManyBlogPosts()(sourceFiles)).sort(sortByDateCreatedDescending);
  Promise.all([
    ...posts.map(generatePost),
    ...posts.map(generate301Pages),
    generateAboutPage(),
    generateHomePage(posts),
    generate404Page(posts.slice(0, 5)),
    generateTagPages(groupBlogPostsByTag(posts)),
  ]).catch(err => {
    console.error(err);
    process.exit(-1);
  });
})();
