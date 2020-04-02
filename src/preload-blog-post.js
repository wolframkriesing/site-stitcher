import * as fs from 'fs';
import * as path from 'path';
import {BlogPost} from './BlogPost.js';

const directoriesWithFullname = (dir) => (entries) => {
  return entries
    .filter(f => f.isDirectory())
    .map(entry => path.join(dir, entry.name))
};
const filesWithFullname = (dir) => (entries) => {
  return entries
    .filter(f => f.isFile())
    .map(entry => path.join(dir, entry.name));
};
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

export const buildBlogPostListFromFiles = (files, dir) => {
  return files.map(file => {
    const date = file.split('-')[0].replace(/\//g, '-');
    const blogPost = BlogPost.withDateCreated(date);
    blogPost.filename = path.join(dir, file);
    return blogPost;
  });
};

export const preloadBlogPostListFromDirectory = ({findFilesInDir} = prodDeps()) => async (path) => {
  const files = await findFilesInDir(path);
  return buildBlogPostListFromFiles(files, path)
};
