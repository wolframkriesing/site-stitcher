import {findTidbitSourceFilenames} from '../_deps/fs.js';
import {TidbitSourceFile} from './TidbitSourceFile.js';

export const loadManyTidbitSourceFiles = () => async (dir) => {
  const files = await findTidbitSourceFilenames(dir);
  return files.map(TidbitSourceFile.withFilename);
}
