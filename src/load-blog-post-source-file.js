import * as fs from 'fs';
import * as path from 'path';
import {BlogPost} from './BlogPost.js';

const directoriesWithFullname = (dir) => (entries) => {
  return entries
    .filter(f => f.isDirectory())
    .map(entry => path.join(dir, entry.name))
};
const filenameStartRegex = /\d\d-/;
const filesWithFullname = (dir) => (entries) => {
  return entries
    .filter(f => f.isFile())
    .filter(entry => entry.name.match(filenameStartRegex))
    .map(entry => path.join(dir, entry.name));
};
/**
 * // @typedef {BlogPostFilename} = 2000/01/01-xxxx.md
 * @param dir
 * @returns {Promise<BlogPostFilename>}
 */
const findFilesInDir = async (dir) => {
  const directoryEntries = await fs.promises.readdir(dir, {withFileTypes: true});
  const yearDirectories = directoriesWithFullname(dir)(directoryEntries);
  const findDirsIn = async (dir) => {
    return fs.promises.readdir(dir, {withFileTypes: true})
      .then(directoriesWithFullname(dir));
  };
  const monthDirectories = (await Promise.all(yearDirectories.map(findDirsIn))).flat();
  const findPostsIn = async (dir) => {
    return fs.promises.readdir(dir, {withFileTypes: true})
      .then(filesWithFullname(dir));
  };
  const files = (await Promise.all(monthDirectories.map(findPostsIn))).flat();
  const removeRootBlogPostDirectory = files => files.map(file => file.replace(dir, '').replace('/', ''));
  return removeRootBlogPostDirectory(files);
};

const prodDeps = () => {
  return {findFilesInDir};
};

export const toManyBlogPostSourceFiles = (files, dir) => {
  return files.map(file => BlogPost.preload(path.join(dir, file)));
};

export const loadManyBlogPostSourceFilesFromFilesystem = ({findFilesInDir} = prodDeps()) => async (path) => {
  const files = await findFilesInDir(path);
  return toManyBlogPostSourceFiles(files, path)
};
