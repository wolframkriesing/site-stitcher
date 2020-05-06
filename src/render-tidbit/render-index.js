import path from 'path';
import Tundra from 'tundrajs';
import {writeFile} from '../_deps/fs.js';

const prodDeps = () => {
  return {writeFile};
}

const tundra = new Tundra({cache: false});
tundra.setBase(path.join(__dirname, '../templates'));
const renderIndexPage = (data) => {
  try {
    return tundra.getRender('tidbit/index.html', data);
  } catch (e) {
    return 'ERROR rendering: ' + e;
  }
}
const renderTidbitPage = (data) => {
  try {
    return tundra.getRender('tidbit/page.html', data);
  } catch (e) {
    return 'ERROR rendering: ' + e;
  }
}

export const renderAndWriteTidbitsIndexPage = ({writeFile = prodDeps()}) => async (tidbits) => {
  await writeFile('/tidbit/index.html', renderIndexPage({tidbits}));
};

export const renderAndWriteTidbitPage = ({writeFile = prodDeps()}) => async (tidbits) => {
  const pageWriters = tidbits.map(t => writeFile(t.url + 'index.html', renderTidbitPage({tidbit: t})));
  await Promise.all(pageWriters);
};
