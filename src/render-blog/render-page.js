import {writeOutputFile} from '../_deps/fs.js';
import {renderTemplate} from '../_deps/render-template.js';

/**
 * @typedef {function(Filename, string): Promise<void>} writeFile
 * @typedef {function(PlainObject): string} renderPage
 * @typedef {{writeFile?: writeFile, renderPage?: renderPage}} TagPageProductionDependencies
 */

/**
 * @param data {PlainObject}
 * @return {string}
 */
const renderTagPage = (data) => renderTemplate('blog/tag.html', data);

/**
 * @param deps? {TagPageProductionDependencies}
 * @return {function(ArticlesGroupedByTag[], PlainObject): Promise<void>}
 */
export const renderAndWriteTagPages = ({writeFile = writeOutputFile, renderPage = renderTagPage} = {}) => async (groups, renderParams) => {
  /**
   * @param tagSlug {string}
   * @return {string}
   */
  const destFilename = tagSlug => `/blog/tag/${tagSlug}/index.html`;
  /**
   * @param group {ArticlesGroupedByTag}
   * @return {Promise<void>}
   */
  const writeGroup = group => writeFile(destFilename(group.tagSlug), renderPage({...renderParams, tag: group.tagSlug, articles: group.articles}));
  const pageWriters = groups.map(writeGroup);
  await Promise.all(pageWriters);
}
