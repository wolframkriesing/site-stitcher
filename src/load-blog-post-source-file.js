import * as path from 'path';
import {findFilesInDir} from './_deps/fs.js';
import {BlogPostSourceFile} from './BlogPostSourceFile.js';

const prodDeps = () => {
  return {findFilesInDir};
};

const toSourceFile = (filename) => BlogPostSourceFile.withFilename(filename);

export const loadManyBlogPostSourceFiles = ({findFilesInDir} = prodDeps()) => async (dir) => {
  const files = (await findFilesInDir(dir)).map(file => file.endsWith('.md') ? file : `${file}/index.md`);
  return files.map(file => toSourceFile(path.join(dir, file)));
};
