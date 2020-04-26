import * as path from 'path';
import marked from 'marked';
import Tundra from 'tundrajs';
import * as fs from 'fs';
import {loadManyBlogPostSourceFiles} from './load-blog-post-source-file.js';
import {loadManyBlogPosts} from './load-blog-post.js';
import {sortByDateCreatedDescending} from './sort-blog-post.js';
import {groupBlogPostsByTag, groupBlogPostsByYearAndMonth} from './group-blog-posts.js';

import {toReadableDate, toWeekday} from './date.js';

const tundra = new Tundra({cache: true});

const navigationItems = [
  {path: '/', name: 'Home'},
  {path: '/tidbits', name: 'Tidbits'},
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
  // console.log("Built 301 page ", destFilename);
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
}

const generatePost = async (post) => {
  const destDir = path.join(__dirname, '../_output', post.url);
  await fs.promises.mkdir(destDir, {recursive: true});
  const destFilename = path.join(destDir, 'index.html');
  const renderedFile = tundra.getRender('post.html', {...defaultRenderParams, post});
  await fs.promises.writeFile(destFilename, renderedFile);
}

const generateAboutPage = async () => {
  const destDir = path.join(__dirname, '../_output', 'about');
  const contentDir = path.join(__dirname, '../content');
  await fs.promises.mkdir(destDir, {recursive: true});
  const destFilename = path.join(destDir, 'index.html');
  const content = marked(await fs.promises.readFile(path.join(contentDir, 'about.md'), 'utf8'));
  const renderedFile = tundra.getRender('about.html', {...defaultRenderParams, content});
  await fs.promises.writeFile(destFilename, renderedFile);
}

import {tidbitMarkdownToHtml} from './parse-tidbits-markdown.js';
const generateTidbitsPage = async () => {
  const destDir = path.join(__dirname, '../_output', 'tidbits');
  const contentDir = path.join(__dirname, '../content');
  await fs.promises.mkdir(destDir, {recursive: true});
  const destFilename = path.join(destDir, 'index.html');
  const content = tidbitMarkdownToHtml(await fs.promises.readFile(path.join(contentDir, 'tidbits.md'), 'utf8'));
  const renderedFile = tundra.getRender('tidbits.html', {...defaultRenderParams, content});
  await fs.promises.writeFile(destFilename, renderedFile);
}

const generateHomePage = async (posts) => {
  const renderedFile = tundra.getRender('index.html', {...defaultRenderParams, posts});
  const destFilename = path.join(__dirname, '../_output', 'index.html');
  await fs.promises.writeFile(destFilename, renderedFile);
};

const generateTagPage = async (group) => {
  const tag = group.tag;
  const destDir = path.join(__dirname, '../_output', 'blog/tag', tag);
  await fs.promises.mkdir(destDir, {recursive: true});
  const destFilename = path.join(destDir, 'index.html');
  const renderedFile = tundra.getRender('tag.html', {...defaultRenderParams, tag, posts: group.blogPosts});
  await fs.promises.writeFile(destFilename, renderedFile);
};

const generateMonthPage = async (group) => {
  const yearAndMonth = group.yearAndMonth;
  const destDir = path.join(__dirname, '../_output', 'blog', yearAndMonth.replace('-', '/'));
  await fs.promises.mkdir(destDir, {recursive: true});
  const destFilename = path.join(destDir, 'index.html');
  const renderedFile = tundra.getRender('month.html', {...defaultRenderParams, yearAndMonth, posts: group.blogPosts});
  await fs.promises.writeFile(destFilename, renderedFile);
};

const generateTagPages = async (postGroups) => Promise.all(postGroups.map(generateTagPage));
const generateMonthPages = async (postGroups) => Promise.all(postGroups.map(generateMonthPage));

const timeIt = async (label, fn) => {
  console.time(label);
  await fn();
  console.timeEnd(label);
}

import {findRelatedPosts} from './related-posts.js';
(async() => {
  console.time('Overall');
  console.log('Preparing data\n========');
  console.time('Load source files');
  const postsDirectory = path.join(__dirname, '../content/blog-posts');
  const sourceFiles = await loadManyBlogPostSourceFiles()(postsDirectory);
  console.timeEnd('Load source files');
  console.time('Load blog posts');
  const posts = (await loadManyBlogPosts()(sourceFiles)).sort(sortByDateCreatedDescending);
  console.timeEnd('Load blog posts');
  console.time('Relate and group posts');
  posts.forEach(post => post.relatedPosts = findRelatedPosts(post, posts));
  const groupedBlogPosts = {
    byTag: groupBlogPostsByTag(posts),
    byMonth: groupBlogPostsByYearAndMonth(posts),
  };
  defaultRenderParams.groupedBlogPosts = groupedBlogPosts;
  console.timeEnd('Relate and group posts');

  console.log('\nBuilding pages\n========');
  await timeIt('All posts', () => Promise.all(posts.map(generatePost)));
  await timeIt('All 301 pages', () => Promise.all(posts.map(generate301Pages)));
  await timeIt('All tags pages', () => generateTagPages(groupedBlogPosts.byTag));
  await timeIt('All month pages', () => generateMonthPages(groupedBlogPosts.byMonth));
  await timeIt('Home page', () => generateHomePage(posts));
  await timeIt('About page', () => generateAboutPage());
  await timeIt('Tidbits page', () => generateTidbitsPage());
  await timeIt('404 page', () => generate404Page(posts.slice(0, 5)));
  console.log('-----');
  console.timeEnd('Overall');
  console.log('-----');
})();
