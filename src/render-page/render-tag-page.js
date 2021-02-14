import {writeOutputFile} from '../_deps/fs.js';
import {renderTemplate} from '../_deps/render-template.js';

/**
 * @typedef {function(Filename, string): Promise<void>} writeFile
 * @typedef {function(PlainObject): string} renderPage
 * @typedef {{writeFile?: writeFile, renderPage?: renderPage}} TagPageProductionDependencies
 */

/**
 * @param deps? {TagPageProductionDependencies}
 * @return {function(ArticlesGroupedByTag[], PlainObject): Promise<void>}
 */
export const renderAndWriteTagPages = ({writeFile, renderPage}) => async (groups, renderParams) => {
  /**
   * @param group {ArticlesGroupedByTag}
   * @return {Promise<void>}
   */
  const writeGroup = group => writeFile(group.tagSlug, renderPage({...renderParams, tag: group.tagSlug, articles: group.articles}));
  const pageWriters = groups.map(writeGroup);
  await Promise.all(pageWriters);
}

const writeBlogTagFile = (tagSlug, content) => writeOutputFile(`/blog/tag/${tagSlug}/index.html`, content);
/**
 * @param data {PlainObject}
 * @return {string}
 */
const renderBlogPostTagPage = (data) => renderTemplate('blog/tag.html', data);
const writeAllTagFile = (tagSlug, content) => writeOutputFile(`/tag/${tagSlug}/index.html`, content);
/**
 * @param data {PlainObject}
 * @return {string}
 */
const renderAllTagPage = (data) => renderTemplate('tag.html', data);
export const renderAndWriteBlogTagPages = renderAndWriteTagPages({writeFile: writeBlogTagFile, renderPage: renderBlogPostTagPage});
export const renderAndWriteAllTagPages = renderAndWriteTagPages({writeFile: writeAllTagFile, renderPage: renderAllTagPage});

export const forTesting = {
  renderBlogPostTagPage,
};