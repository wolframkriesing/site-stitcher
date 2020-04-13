import * as fs from 'fs';
import * as path from 'path';
import {BlogPostSourceFile} from './BlogPostSourceFile.js';

const toAbsoluteDirectoryName = (dir) => (entries) => {
  return entries
    .filter(f => f.isDirectory())
    .map(entry => path.join(dir, entry.name))
};
const toAbsoluteBlogPostSourceFilename = (dir) => (entries) => {
  return entries
    .map(entry => {
      if (entry.isFile()) {
        return path.join(dir, entry.name)
      }
      if (entry.isDirectory()) {
        return path.join(dir, entry.name, 'index.md')
      }
    })
};
const filenameStartRegex = /\d\d-/;
const findOnlyBlogPostSourceFilesOrDirs = (entries) => {
  return entries
    .filter(entry => entry.name.match(filenameStartRegex))
  ;
};
/**
 * TODO not sure that this function should also filter the files and folders by name, this might rather be a "biz log" not a dependency logic
 * // @typedef {BlogPostFilename} = 2000/01/01-xxxx.md
 * @param dir
 * @returns {Promise<BlogPostFilename>}
 */
const findFilesInDir = async (dir) => {
  const findMonthDirectories = async (dir) => {
    return fs.promises.readdir(dir, {withFileTypes: true})
      .then(toAbsoluteDirectoryName(dir));
  };
  const findBlogPostSourceFiles = async (dir) => {
    return fs.promises.readdir(dir, {withFileTypes: true})
      .then(findOnlyBlogPostSourceFilesOrDirs)
      .then(toAbsoluteBlogPostSourceFilename(dir))
    ;
  };
  const removeRootBlogPostDirectory = files => files.map(file => file.replace(dir, '').replace('/', ''));

  const yearDirectoryEntries = await fs.promises.readdir(dir, {withFileTypes: true});
  const yearDirectories = toAbsoluteDirectoryName(dir)(yearDirectoryEntries);
  const monthDirectories = (await Promise.all(yearDirectories.map(findMonthDirectories))).flat();
  const files = (await Promise.all(monthDirectories.map(findBlogPostSourceFiles))).flat();
  return removeRootBlogPostDirectory(files);
};

const prodDeps = () => {
  return {findFilesInDir};
};

const toSourceFile = (filename) => BlogPostSourceFile.withFilename(filename);

export const loadManyBlogPostSourceFiles = ({findFilesInDir} = prodDeps()) => async (dir) => {
  const files = await findFilesInDir(dir);
  return files.map(file => toSourceFile(path.join(dir, file)));
};
