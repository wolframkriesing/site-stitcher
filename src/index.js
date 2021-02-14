import * as path from 'path';
import marked from 'marked';
import * as fs from 'fs';
import {CONTENT_DIRECTORY, BLOG_POSTS_DIRECTORY, OUTPUT_DIRECTORY} from './config.js';
import {loadManyBlogPostSourceFiles} from './blog-post/load-blog-post-source-file.js';
import {loadManyBlogPosts} from './blog-post/load-blog-post.js';
import {sortByDateCreatedDescending} from './blog-post/sort-blog-post.js';
import {groupArticlesByTag, groupArticlesByYearAndMonth} from './_shared/group-articles.js';
import {loadTidbits} from './load-tidbit/load-tidbit.js';
import {loadManyTidbitSourceFiles} from './load-tidbit/load-tidbit-source-file.js';
import {renderTemplate} from './_deps/render-template.js';

const navigationItems = [
  {path: '/', name: 'Home 🏠'},
  {path: '/blog', name: 'Blog ✍️'},
  {path: '/tidbits', name: 'Tidbits 😋'},
  {path: '/projects', name: 'Projects 🛠‍‍'},
  {path: '/about', name: 'About 💡'},
];
const defaultRenderParams = {
  navigationItems,
  site: { // TODO to be used on the site!
    title: 'picostitch',
    subtitle: 'crafting (and) JavaScript',
    domain: 'picostitch.com',
  },
  blogroll: [
    {url: 'https://blog.thecodewhisperer.com/', name: 'JB Rainsberger', tags: ['good software', 'tdd', 'testing']},
    {url: 'https://michaelfeathers.silvrback.com/', name: 'Michae Feathers', tags: ['good software', 'legacy code']},
    {url: 'https://ruben.verborgh.org/', name: 'Ruben Verborgh', tags: ['solid project', 'privacy', 'decentralized web']},
    {url: 'https://component.kitchen/elix', name: 'Elix - High Quality Web Components', tags: ['project', 'open source', 'web components', 'JavaScript']},
  ]
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

import {renderAndWriteTidbitPages, renderAndWriteTidbitsIndexPage, renderAndWriteTidbitTagPages} from './render-tidbit/render-page.js';
const generateSingleTidbitsPages = (tidbits) => renderAndWriteTidbitPages()(tidbits, defaultRenderParams);
const generateTidbitsIndexPage = (tidbits) => renderAndWriteTidbitsIndexPage()(tidbits, defaultRenderParams);
const generateTidbitTagPages = (tidbitGroups) => renderAndWriteTidbitTagPages()(tidbitGroups, defaultRenderParams);


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
  const rawContent = JSON.parse(await fs.promises.readFile(path.join(CONTENT_DIRECTORY, 'about/wolframkriesing.json'), 'utf8'));
  const content = { ...rawContent, mostRelevantJobsCount: rawContent.jobs.filter(j => j.isMostRelevant).length };
  content.toTransparency = v => 100 - (v/3 || 0);
  const renderedFile = renderTemplate('about/cv.html', {...defaultRenderParams, content});
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

const generateMonthPage = async (group) => {
  const yearAndMonth = group.yearAndMonth;
  const destDir = path.join(OUTPUT_DIRECTORY, 'blog', yearAndMonth.replace('-', '/'));
  await fs.promises.mkdir(destDir, {recursive: true});
  const destFilename = path.join(destDir, 'index.html');
  const renderedFile = renderTemplate('blog/month.html', {...defaultRenderParams, yearAndMonth, articles: group.articles});
  await fs.promises.writeFile(destFilename, renderedFile);
};

const generateTagPages = (postGroups) => renderAndWriteTagPages()(postGroups, defaultRenderParams);
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
import {renderAndWriteTagPages} from "./render-blog/render-page.js";

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

  console.time('Load tidbits');
  const tidbitsDirectory = path.join(CONTENT_DIRECTORY, 'tidbit');
  const tidbitSourceFiles = await loadManyTidbitSourceFiles()(tidbitsDirectory);
  const tidbits = await loadTidbits()(tidbitSourceFiles);
  console.timeEnd('Load tidbits');

  const articles = [...posts, ...tidbits];

  console.time('Relate and group blog+tidbits');
  articles.forEach(post => post.relatedPosts = findRelatedPosts(post, articles));
  const articlesGroupedByTag = groupArticlesByTag(articles, '/blog/tag');
  const sortAlphabeticallyByTag = (group1, group2) => group1.tagSlug > group2.tagSlug ? 1 : -1;
  const groupedArticles = {
    byTag: articlesGroupedByTag,
    byTagSortedAlphabetically: [...articlesGroupedByTag].sort(sortAlphabeticallyByTag),
    byMonth: groupArticlesByYearAndMonth(articles, '/blog'),
  };
  defaultRenderParams.groupedArticles = groupedArticles;
  console.timeEnd('Relate and group blog+tidbits');

  console.log('\nBuilding pages\n========');
  await runAndTimeIt('Home page', () => generateHomePage(posts.excludingDrafts(), tidbits));
  // blog
  console.log('Blog');
  await runAndTimeIt(`  all posts (${posts.length})`, () => Promise.all(posts.map(generatePost)));
  await runAndTimeIt('  /blog page', () => generateBlogOverviewPage(posts.excludingDrafts()));
  await runAndTimeIt(`  tags pages (${groupedArticles.byTag.length})`, () => generateTagPages(groupedArticles.byTag));
  await runAndTimeIt(`  month pages (${groupedArticles.byMonth.length})`, () => generateMonthPages(groupedArticles.byMonth));

  console.log('Tidbit');
  await runAndTimeIt(`  /tidbits page`, () => generateTidbitsIndexPage(tidbits));
  await runAndTimeIt(`  all pages (${tidbits.length})`, () => generateSingleTidbitsPages(tidbits));
  await runAndTimeIt(`  tags pages (${groupedArticles.byTag.length})`, () => generateTidbitTagPages(groupedArticles.byTag));
  await runAndTimeIt('About pages', () => generateAboutPages());
  await runAndTimeIt('Projects page', () => generateProjectsPage());
  await runAndTimeIt('Projects plan page', () => generateProjectsPlanPage());

  console.log('HTTP pages');
  const oldUrlsCount = posts.reduce((prev, cur) => cur.oldUrls.length + prev, 0);
  await runAndTimeIt(`  301 pages (${oldUrlsCount})`, () => Promise.all(posts.map(generate301Pages)));
  await runAndTimeIt('  404 page', () => generate404Page(posts.slice(0, 5)));
  
  console.log('-----');
  console.timeEnd('Overall');
  console.log('-----');
})();
