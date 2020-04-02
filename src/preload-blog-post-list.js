import * as fs from 'fs';
import * as path from 'path';
import {buildBlogPostListFromFiles} from './blog-post-list.js';

const findFilesInDir = async (dir) => {
  const yearDirectories = (await fs.promises.readdir(dir, {withFileTypes: true}))
    .filter(f => f.isDirectory())
    .map(f => path.join(dir, f.name))
  ;
  const findDirsIn = async (dir) => {
    return fs.promises.readdir(dir, {withFileTypes: true})
      .then(files => files
        .filter(f => f.isDirectory())
        .map(f => path.join(dir, f.name))
      );
  };
  const monthDirectories = (await Promise.all(yearDirectories.map(findDirsIn))).flat();
  const findPostsIn = async (dir) => {
    return fs.promises.readdir(dir, {withFileTypes: true})
      .then(files => files
        .filter(f => f.isFile())
        .map(f => path.join(dir, f.name))
      );
  };
  const files = (await Promise.all(monthDirectories.map(findPostsIn))).flat();
  const removeRootBlogPostDirectory = files => files.map(file => file.replace(dir, '').replace('/', ''))
  return removeRootBlogPostDirectory(files);
};

export const preloadBlogPostListFromDirectory = () => async (path) => {
  const files = await findFilesInDir(path);
  return buildBlogPostListFromFiles(files, path)
};
