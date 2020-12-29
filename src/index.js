import * as path from 'path';
import marked from 'marked';
import nunjucks from 'nunjucks';
import * as fs from 'fs';
import {CONTENT_DIRECTORY, BLOG_POSTS_DIRECTORY, TEMPLATES_DIRECTORY, OUTPUT_DIRECTORY} from './config.js';
import {loadManyBlogPostSourceFiles} from './blog-post/load-blog-post-source-file.js';
import {loadManyBlogPosts} from './blog-post/load-blog-post.js';
import {sortByDateCreatedDescending} from './blog-post/sort-blog-post.js';
import {groupBlogPostsByTag, groupBlogPostsByYearAndMonth} from './blog-post/group-blog-posts.js';
import {loadTidbits} from './load-tidbit/load-tidbit.js';
import {loadManyTidbitSourceFiles} from './load-tidbit/load-tidbit-source-file.js';

import {toReadableDate, toReadableYearAndMonth, toWeekday} from './_shared/date.js';

const nunjucksOptions = {
  autoescape: true,
  throwOnUndefined: true,
  trimBlocks: true,
  lstripBlocks: true,
};

const nunjucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader(TEMPLATES_DIRECTORY), nunjucksOptions);
nunjucksEnv.addFilter('toReadableDate', toReadableDate);
nunjucksEnv.addFilter('toReadableYearAndMonth', toReadableYearAndMonth);
nunjucksEnv.addFilter('toWeekday', toWeekday);
const renderTemplate = (tplFile, data) => {
  return nunjucksEnv.render(tplFile, data);
}

const navigationItems = [
  {path: '/', name: 'Home 🏠'},
  {path: '/blog', name: 'Blog ✍️'},
  {path: '/tidbits', name: 'Tidbits 😋'},
  {path: '/projects', name: 'Projects 🛠‍‍'},
  {path: '/about', name: 'About 💡'},
];
const defaultRenderParams = {
  navigationItems,
};

const generate301Page = async (oldPath, newPath) => {
  const destDir = path.join(OUTPUT_DIRECTORY, oldPath);
  await fs.promises.mkdir(destDir, {recursive: true});
  const destFilename = path.join(destDir, 'index.html');
  const renderedFile = renderTemplate('301.html', {...defaultRenderParams, redirectUrl: newPath});
  await fs.promises.writeFile(destFilename, renderedFile);
  // console.log("Built 301 page ", destFilename);
}

const generate301Pages = (post) => {
  if (post.oldUrls.length > 0) {
    return Promise.all(post.oldUrls.map(oldUrl => generate301Page(oldUrl, post.url)));
  }
}

const generate404Page = async (posts) => {
  const destDir = OUTPUT_DIRECTORY;
  await fs.promises.mkdir(destDir, {recursive: true});
  const destFilename = path.join(destDir, '404.html');
  const renderedFile = renderTemplate('404.html', {...defaultRenderParams, posts});
  await fs.promises.writeFile(destFilename, renderedFile);
}

const generatePost = async (post) => {
  const destDir = path.join(OUTPUT_DIRECTORY, post.url);
  await fs.promises.mkdir(destDir, {recursive: true});
  const destFilename = path.join(destDir, 'index.html');
  const renderedFile = renderTemplate('blog/post.html', {...defaultRenderParams, post});
  await fs.promises.writeFile(destFilename, renderedFile);
}

import {renderAndWriteTidbitPages, renderAndWriteTidbitsIndexPage} from './render-tidbit/render-page.js';
const generateTidbitsPages = async (tidbits) => {
  await renderAndWriteTidbitsIndexPage()(tidbits, defaultRenderParams);
  await renderAndWriteTidbitPages()(tidbits, defaultRenderParams);
};

const aboutIndexPage = async () => {
  const destDir = path.join(OUTPUT_DIRECTORY, 'about');
  await fs.promises.mkdir(destDir, {recursive: true});
  const destFilename = path.join(destDir, 'index.html');
  const content = marked(await fs.promises.readFile(path.join(CONTENT_DIRECTORY, 'about/index.md'), 'utf8'));
  const renderedFile = renderTemplate('about/index.html', {...defaultRenderParams, content});
  await fs.promises.writeFile(destFilename, renderedFile);
};
const aboutPersonPage = async () => {
  const destDir = path.join(OUTPUT_DIRECTORY, 'about/wolframkriesing');
  await fs.promises.mkdir(destDir, {recursive: true});
  const destFilename = path.join(destDir, 'index.html');
  const content = await fs.promises.readFile(path.join(CONTENT_DIRECTORY, 'about/wolframkriesing.json'), 'utf8');
  const renderedFile = renderTemplate('about/cv.html', {...defaultRenderParams, content: JSON.parse(content)});
  await fs.promises.writeFile(destFilename, renderedFile);
};
const generateAboutPages = async () => {
  await aboutIndexPage();
  await aboutPersonPage();
}

const generateProjectsPage = async () => {
  const destDir = path.join(OUTPUT_DIRECTORY, 'projects');
  await fs.promises.mkdir(destDir, {recursive: true});
  const destFilename = path.join(destDir, 'index.html');
  const content = marked(await fs.promises.readFile(path.join(CONTENT_DIRECTORY, 'projects/index.md'), 'utf8'));
  const renderedFile = renderTemplate('projects/index.html', {...defaultRenderParams, content});
  await fs.promises.writeFile(destFilename, renderedFile);
};
const generateProjectsPlanPage = async () => {
  const destDir = path.join(OUTPUT_DIRECTORY, 'projects/plan');
  await fs.promises.mkdir(destDir, {recursive: true});
  const destFilename = path.join(destDir, 'index.html');
  const content = marked(await fs.promises.readFile(path.join(CONTENT_DIRECTORY, 'projects/plan.md'), 'utf8'));
  const renderedFile = renderTemplate('projects/index.html', {...defaultRenderParams, content});
  await fs.promises.writeFile(destFilename, renderedFile);
};

const generateBlogOverviewPage = async (posts) => {
  const renderedFile = renderTemplate('blog/index.html', {...defaultRenderParams, posts});
  const destFilename1 = path.join(OUTPUT_DIRECTORY, 'blog/index.html');
  await fs.promises.writeFile(destFilename1, renderedFile);
};

const generateHomePage = async (posts, tidbits) => {
  const renderedFile = renderTemplate('home.html', {...defaultRenderParams, posts, tidbits});
  const destFilename = path.join(OUTPUT_DIRECTORY, 'index.html');
  await fs.promises.writeFile(destFilename, renderedFile);
};

const generateTagPage = async (group) => {
  const tag = group.tag;
  const destDir = path.join(OUTPUT_DIRECTORY, 'blog/tag', tag);
  await fs.promises.mkdir(destDir, {recursive: true});
  const destFilename = path.join(destDir, 'index.html');
  const renderedFile = renderTemplate('blog/tag.html', {...defaultRenderParams, tag, posts: group.blogPosts});
  await fs.promises.writeFile(destFilename, renderedFile);
};

const generateMonthPage = async (group) => {
  const yearAndMonth = group.yearAndMonth;
  const destDir = path.join(OUTPUT_DIRECTORY, 'blog', yearAndMonth.replace('-', '/'));
  await fs.promises.mkdir(destDir, {recursive: true});
  const destFilename = path.join(destDir, 'index.html');
  const renderedFile = renderTemplate('blog/month.html', {...defaultRenderParams, yearAndMonth, posts: group.blogPosts});
  await fs.promises.writeFile(destFilename, renderedFile);
};

const generateTagPages = async (postGroups) => Promise.all(postGroups.map(generateTagPage));
const generateMonthPages = async (postGroups) => Promise.all(postGroups.map(generateMonthPage));

const runAndTimeIt = async (label, fn) => {
  const paddedLabel = (label + new Array(20).fill(' ').join('')).substr(0, 25);
  console.time(paddedLabel);
  try {
    await fn();
  } catch(e) {
    console.error(e);
    process.exit(1); 
  }
  console.timeEnd(paddedLabel);
}

import {findRelatedPosts} from './blog-post/related-posts.js';

const isNotDraft = post => post.isDraft === false;
const loadPosts = async sourceFiles => {
  const posts = (await loadManyBlogPosts()(sourceFiles)).sort(sortByDateCreatedDescending);
  posts.excludingDrafts = () => posts.filter(isNotDraft);
  return posts;
}

(async() => {
  console.time('Overall');
  console.log('Preparing data\n========');
  console.time('Load source files');
  const sourceFiles = await loadManyBlogPostSourceFiles()(BLOG_POSTS_DIRECTORY);
  console.timeEnd('Load source files');
  console.time('Load blog posts');
  const posts = await loadPosts(sourceFiles);
  console.timeEnd('Load blog posts');
  console.time('Relate and group posts');
  posts.forEach(post => post.relatedPosts = findRelatedPosts(post, posts));
  const groupedBlogPosts = {
    byTag: groupBlogPostsByTag(posts),
    byMonth: groupBlogPostsByYearAndMonth(posts),
  };
  defaultRenderParams.groupedBlogPosts = groupedBlogPosts;
  console.timeEnd('Relate and group posts');

  console.time('Load tidbits');
  const tidbitsDirectory = path.join(CONTENT_DIRECTORY, 'tidbit');
  const tidbitSourceFiles = await loadManyTidbitSourceFiles()(tidbitsDirectory);
  const tidbits = await loadTidbits()(tidbitSourceFiles);
  console.timeEnd('Load tidbits');

  console.log('\nBuilding pages\n========');
  await runAndTimeIt('Home page', () => generateHomePage(posts.excludingDrafts(), tidbits));
  // blog
  await runAndTimeIt(`All blog posts (${posts.length})`, () => Promise.all(posts.map(generatePost)));
  await runAndTimeIt('Blog overview page', () => generateBlogOverviewPage(posts.excludingDrafts()));

  await runAndTimeIt(`All tags pages (${groupedBlogPosts.byTag.length})`, () => generateTagPages(groupedBlogPosts.byTag));
  // await runAndTimeIt('All month pages', () => generateMonthPages(groupedBlogPosts.byMonth));
  // await runAndTimeIt('About pages', () => generateAboutPages());
  // await runAndTimeIt('Tidbit pages', () => generateTidbitsPages(tidbits));
  // await runAndTimeIt('Projects page', () => generateProjectsPage());
  // await runAndTimeIt('Projects plan page', () => generateProjectsPlanPage());
  // await runAndTimeIt('All 301 pages', () => Promise.all(posts.map(generate301Pages)));
  // await runAndTimeIt('404 page', () => generate404Page(posts.slice(0, 5)));
  
  console.log('-----');
  console.timeEnd('Overall');
  console.log('-----');
})();
