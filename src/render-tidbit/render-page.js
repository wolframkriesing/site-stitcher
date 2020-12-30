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
