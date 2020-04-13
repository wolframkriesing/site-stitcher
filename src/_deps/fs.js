import * as fs from 'fs';
import * as path from 'path';

export const readFile = async (filename) => fs.promises.readFile(filename, 'utf8');

const toAbsoluteDirectoryName = (dir) => (entries) => {
  return entries
    .filter(f => f.isDirectory())
    .map(entry => path.join(dir, entry.name))
};
const toAbsoluteDirectoryOrFilename = (dir) => (entries) => {
  return entries
    .map(entry => path.join(dir, entry.name))
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
const findBlogPostDirsOrFilesInDir = async (dir) => {
  const findYearDirectories = async (dir) => {
    return await fs.promises.readdir(dir, {withFileTypes: true})
      .then(toAbsoluteDirectoryName(dir));
  };
  const findMonthDirectories = async (dir) => {
    return fs.promises.readdir(dir, {withFileTypes: true})
      .then(toAbsoluteDirectoryName(dir));
  };
  const findBlogPostSourceFiles = async (dir) => {
    return fs.promises.readdir(dir, {withFileTypes: true})
      .then(findOnlyBlogPostSourceFilesOrDirs)
      .then(toAbsoluteDirectoryOrFilename(dir))
    ;
  };
  const removeRootBlogPostDirectory = (dir) => (file) =>
    file.replace(`${dir}/`, '');

  const yearDirectories = await findYearDirectories(dir);
  const monthDirectories = (await Promise.all(yearDirectories.map(findMonthDirectories))).flat();
  const files = (await Promise.all(monthDirectories.map(findBlogPostSourceFiles))).flat();
  return files.map(removeRootBlogPostDirectory(dir));
};

export const findBlogPostSourceFilenames = async (dir) => {
  return (await findBlogPostDirsOrFilesInDir(dir))
    .map(file => file.endsWith('.md') ? file : `${file}/index.md`)
  ;
}