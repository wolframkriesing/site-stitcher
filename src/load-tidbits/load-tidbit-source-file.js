import {findTidbitSourceFilenames} from '../_deps/fs.js';

export const loadManyTidbitSourceFiles = () => async (dir) => {
  const files = await findTidbitSourceFilenames(dir);
  return files.map(file => ({filename: file, monthAndYear: file.split('/').slice(-3, -1).join('-')}));
}
