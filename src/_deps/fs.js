import * as fs from 'fs';
import * as path from 'path';
import {OUTPUT_DIRECTORY} from '../config.js';

/**
 * @param dir {Path}
 * @return {Promise<void>}
 */
const mkdirRecursive = async (dir) => {
  await fs.promises.mkdir(dir, {recursive: true});
}

/**
 * @param filename {Filename}
 * @return {Promise<string>}
 */
export const readFile = async (filename) =>
  fs.promises.readFile(filename, 'utf8');
/**
 * @param filename {Filename}
 * @param content {string}
 * @return {Promise<void>}
 */
export const writeOutputFile = async (filename, content) => {
  const destFilename = path.join(OUTPUT_DIRECTORY, filename);
  await mkdirRecursive(path.dirname(destFilename));
  return fs.promises.writeFile(destFilename, content, 'utf8');
}
/**
 * @param dir {Path}
 * @return {function(fs.Dirent[]): string[]}
 */
const toAbsoluteDirectoryName = (dir) => (entries) => {
  return entries
    .filter(f => f.isDirectory())
    .map(entry => path.join(dir, entry.name))
};
/**
 * @param dir {Path}
 * @return {function(fs.Dirent[]): string[]}
 */
const toAbsoluteDirectoryOrFilename = (dir) => (entries) => {
  return entries
    .map(entry => path.join(dir, entry.name))
};
const filenameStartRegex = /\d\d-/;
/**
 * @param entries {fs.Dirent[]}
 * @return {*}
 */
const findOnlyBlogPostSourceFilesOrDirs = (entries) => {
  return entries
    .filter(entry => entry.name.match(filenameStartRegex))
  ;
};
/**
 * @param entries {fs.Dirent[]}
 * @return {fs.Dirent[]}
 */
const findOnlyTidbitSourceFiles = (entries) => {
  return entries
    .filter(entry => entry.name === 'index.md')
  ;
};
/**
 * TODO not sure that this function should also filter the files and folders by name, this might rather be a "biz log" not a dependency logic
 * // @typedef {BlogPostFilename} = 2000/01/01-xxxx.md
 * @param dir {Path}
 * @returns {Promise<Filename[]>}
 */
const findBlogPostDirsOrFilesInDir = async (dir) => {
  /**
   * @param dir {Path}
   * @return {Promise<string[]>}
   */
  const findYearDirectories = async (dir) => {
    return await fs.promises.readdir(dir, {withFileTypes: true})
      .then(toAbsoluteDirectoryName(dir));
  };
  /**
   * @param dir {Path}
   * @return {Promise<string[]>}
   */
  const findMonthDirectories = async (dir) => {
    return fs.promises.readdir(dir, {withFileTypes: true})
      .then(toAbsoluteDirectoryName(dir));
  };
  /**
   * @param dir {Path}
   * @return {Promise<string[]>}
   */
  const findBlogPostSourceFiles = async (dir) => {
    return fs.promises.readdir(dir, {withFileTypes: true})
      .then(findOnlyBlogPostSourceFilesOrDirs)
      .then(toAbsoluteDirectoryOrFilename(dir))
    ;
  };
  const yearDirectories = await findYearDirectories(dir);
  const monthDirectories = (await Promise.all(yearDirectories.map(findMonthDirectories))).flat();
  const files = (await Promise.all(monthDirectories.map(findBlogPostSourceFiles))).flat();
  return files;
};
/**
 * @param dir {Path}
 * @return {Promise<*[]>}
 */
export const findBlogPostSourceFilenames = async (dir) => {
  return (await findBlogPostDirsOrFilesInDir(dir))
    .map(file => file.endsWith('.md') ? file : `${file}/index.md`)
  ;
}
/**
 * @param dir {Path}
 * @return {Promise<Filename[]>}
 */
const findTidbitFilesInDir = async (dir) => {
  /**
   * @param dir {Path}
   * @return {Promise<string[]>}
   */
  const findYearDirectories = async (dir) => {
    return await fs.promises.readdir(dir, {withFileTypes: true})
      .then(toAbsoluteDirectoryName(dir));
  };
  /**
   * @param dir {Path}
   * @return {Promise<string[]>}
   */
  const findMonthDirectories = async (dir) => {
    return fs.promises.readdir(dir, {withFileTypes: true})
      .then(toAbsoluteDirectoryName(dir));
  };
  /**
   * @param dir {Path}
   * @return {Promise<string[]>}
   */
  const findTidbitSourceFiles = async (dir) => {
    return fs.promises.readdir(dir, {withFileTypes: true})
      .then(findOnlyTidbitSourceFiles)
      .then(toAbsoluteDirectoryOrFilename(dir))
    ;
  };
  const yearDirectories = await findYearDirectories(dir);
  const monthDirectories = (await Promise.all(yearDirectories.map(findMonthDirectories))).flat();
  const files = (await Promise.all(monthDirectories.map(findTidbitSourceFiles))).flat();
  return files;
};
/**
 * @param dir {Path}
 * @return {Promise<Filename[]>}
 */
export const findTidbitSourceFilenames = async (dir) => {
  return await findTidbitFilesInDir(dir);
}
