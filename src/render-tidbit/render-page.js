import {writeOutputFile} from '../_deps/fs.js';
import {renderTemplate} from "../render-template.js";

/**
 * @returns {import('./render-page').ProductionDependencies}
 */
const prodDepsForIndexPage = () => {
  return {
    writeFile: writeOutputFile,
    renderPage: (data) => renderTemplate('tidbit/index.html', data),
  };
}
/**
 * @returns {import('./render-page').ProductionDependencies}
 */
const prodDepsForSinglePage = () => {
  return {
    writeFile: writeOutputFile,
    renderPage: (data) => renderTemplate('tidbit/page.html', data),
  };
}
/**
 * @param deps {import('./render-page').ProductionDependencies}
 * @return {function(import('../load-tidbit/Tidbit').Tidbit[], PlainObject): Promise<void>}
 */
export const renderAndWriteTidbitsIndexPage = ({writeFile, renderPage} = prodDepsForIndexPage()) => async (tidbits, renderParams) => {
  await writeFile('/tidbits/index.html', renderPage({...renderParams, tidbits}));
};
/**
 * @param deps {import('./render-page').ProductionDependencies}
 * @return {function(import('../load-tidbit/Tidbit').Tidbit[], PlainObject): Promise<void>}
 */
export const renderAndWriteTidbitPages = ({writeFile, renderPage} = prodDepsForSinglePage()) => async (tidbits, renderParams) => {
  const pageWriters = tidbits.map(t => writeFile(t.url + 'index.html', renderPage({...renderParams, tidbit: t})));
  await Promise.all(pageWriters);
};
