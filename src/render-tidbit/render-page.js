import * as path from 'path';
import Tundra from 'tundrajs';
import {writeOutputFile} from '../_deps/fs.js';

/**
 * @returns {import('./render-page').ProductionDependencies}
 */
const prodDeps = () => {
  return {
    writeFile: writeOutputFile
  };
}

const tundra = new Tundra({cache: false});
tundra.setBase(path.join(__dirname, '../templates'));
/**
 * @param data {PlainObject}
 * @return {string}
 */
const renderIndexPage = (data) => {
  try {
    return tundra.getRender('tidbit/index.html', data);
  } catch (e) {
    return `<h1>ERROR rendering this page</h1><pre>${e.stack}</pre>`;
  }
}
/**
 * @param data {PlainObject}
 * @return {string}
 */
const renderTidbitPage = (data) => {
  try {
    return tundra.getRender('tidbit/page.html', data);
  } catch (e) {
    return 'ERROR rendering: ' + e;
  }
}
/**
 * @param deps {import('./render-page').ProductionDependencies}
 * @return {function(import('../load-tidbit/Tidbit').Tidbit[], PlainObject): Promise<void>}
 */
export const renderAndWriteTidbitsIndexPage = ({writeFile} = prodDeps()) => async (tidbits, renderParams) => {
  await writeFile('/tidbits/index.html', renderIndexPage({...renderParams, tidbits}));
};
/**
 * @param deps {import('./render-page').ProductionDependencies}
 * @return {function(import('../load-tidbit/Tidbit').Tidbit[], PlainObject): Promise<void>}
 */
export const renderAndWriteTidbitPage = ({writeFile} = prodDeps()) => async (tidbits, renderParams) => {
  const pageWriters = tidbits.map(t => writeFile(t.url + 'index.html', renderTidbitPage({...renderParams, tidbit: t})));
  await Promise.all(pageWriters);
};
