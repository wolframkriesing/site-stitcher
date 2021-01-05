import {writeOutputFile} from '../_deps/fs.js';
import {renderTemplate} from '../_deps/render-template.js';

/**
 * @typedef {import('../load-tidbit/Tidbit').Tidbit} Tidbit
 * @typedef {import('./render-page').IndexPageProductionDependencies} IndexPageProductionDependencies
 * @typedef {import('./render-page').SinglePageProductionDependencies} SinglePageProductionDependencies
 */

/**
 * @param data {PlainObject}
 * @return {string}
 */
const renderIndexPage = (data) => renderTemplate('tidbit/index.html', data);
/**
 * @param data {PlainObject}
 * @return {string}
 */
const renderSinglePage = (data) => renderTemplate('tidbit/page.html', data);
/**
 * @param deps {IndexPageProductionDependencies}
 * @return {function(Tidbit[], PlainObject): Promise<void>}
 */
export const renderAndWriteTidbitsIndexPage = ({writeFile = writeOutputFile, renderPage = renderIndexPage} = {}) => async (tidbits, renderParams) => {
  await writeFile('/tidbits/index.html', renderPage({...renderParams, tidbits}));
};
/**
 * @param deps {SinglePageProductionDependencies}
 * @return {function(Tidbit[], PlainObject): Promise<void>}
 */
export const renderAndWriteTidbitPages = ({writeFile = writeOutputFile, renderPage = renderSinglePage} = {}) => async (tidbits, renderParams) => {
  const pageWriters = tidbits.map(t => writeFile(t.url + 'index.html', renderPage({...renderParams, tidbit: t})));
  await Promise.all(pageWriters);
};

/**
 * @param data {PlainObject}
 * @return {string}
 */
const renderTagPage = (data) => renderTemplate('tidbit/tag.html', data);

/**
 * @param deps? {TagPageProductionDependencies}
 * @return {function(BlogPostsByTag[], PlainObject): Promise<void>}
 */
export const renderAndWriteTidbitTagPages = ({writeFile = writeOutputFile, renderPage = renderTagPage} = {}) => async (groups, renderParams) => {
  /**
   * @param tagSlug {string}
   * @return {string}
   */
  const destFilename = tagSlug => `/tidbits/tag/${tagSlug}/index.html`;
  /**
   * @param group {BlogPostsByTag}
   * @return {Promise<void>}
   */
  const writeGroup = group => writeFile(destFilename(group.tagSlug), renderPage({...renderParams, tag: group.tagSlug, posts: group.blogPosts}));
  const pageWriters = groups.map(writeGroup);
  await Promise.all(pageWriters);
}

