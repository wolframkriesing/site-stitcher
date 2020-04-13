import * as path from 'path';
import {findBlogPostSourceFilenames} from './_deps/fs.js';
import {BlogPostSourceFile} from './BlogPostSourceFile.js';

const prodDeps = () => {
  return {findBlogPostSourceFilenames};
};

const toSourceFile = (filename) => BlogPostSourceFile.withFilename(filename);

export const loadManyBlogPostSourceFiles = ({findBlogPostSourceFilenames} = prodDeps()) => async (dir) => {
  const files = await findBlogPostSourceFilenames(dir);
  return files.map(file => toSourceFile(path.join(dir, file)));
};
