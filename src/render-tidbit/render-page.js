import {writeOutputFile} from '../_deps/fs.js';
import {renderTemplate} from '../render-template.js';

const renderIndexPage = (data) => renderTemplate('tidbit/index.html', data);
const renderSinglePage = (data) => renderTemplate('tidbit/page.html', data);
/**
 * @param deps {import('./render-page').ProductionDependencies}
 * @return {function(import('../load-tidbit/Tidbit').Tidbit[], PlainObject): Promise<void>}
 */
export const renderAndWriteTidbitsIndexPage = ({writeFile = writeOutputFile, renderPage = renderIndexPage} = {}) => async (tidbits, renderParams) => {
  await writeFile('/tidbits/index.html', renderPage({...renderParams, tidbits}));
};
/**
 * @param deps {import('./render-page').ProductionDependencies}
 * @return {function(import('../load-tidbit/Tidbit').Tidbit[], PlainObject): Promise<void>}
 */
export const renderAndWriteTidbitPages = ({writeFile = writeOutputFile, renderPage = renderSinglePage} = {}) => async (tidbits, renderParams) => {
  const pageWriters = tidbits.map(t => writeFile(t.url + 'index.html', renderPage({...renderParams, tidbit: t})));
  await Promise.all(pageWriters);
};
