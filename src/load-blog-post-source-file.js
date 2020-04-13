import * as fs from 'fs';
import * as path from 'path';
import {BlogPostSourceFile} from './BlogPostSourceFile.js';

const directoriesWithFullname = (dir) => (entries) => {
  return entries
    .filter(f => f.isDirectory())
    .map(entry => path.join(dir, entry.name))
};
const filenameStartRegex = /\d\d-/;
const filesWithFullname = (dir) => (entries) => {
  return entries
    .filter(f => f.isFile())
    .map(entry => path.join(dir, entry.name));
};
/**
 * TODO not sure that this function should also filter the files and folders by name, this might rather be a "biz log" not a dependency logic
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
  const potentialBlogPostFilenames = removeRootBlogPostDirectory(files);
  return potentialBlogPostFilenames.filter(filename => filename.match(filenameStartRegex));
};

const prodDeps = () => {
  return {findFilesInDir};
};

const toSourceFile = (filename) => BlogPostSourceFile.withFilename(filename);

export const loadManyBlogPostSourceFiles = ({findFilesInDir} = prodDeps()) => async (dir) => {
  const files = await findFilesInDir(dir);
  return files.map(file => toSourceFile(path.join(dir, file)));
};
