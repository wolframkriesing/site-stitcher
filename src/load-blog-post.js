import marked from 'marked';
import * as path from 'path';
import * as fs from 'fs';
import {BlogPost} from './BlogPost.js';

const defaultDeps = () => {
  const loadBlogPostFromFile = async (filename = '2018/05/13-jscoderetreat-13-tetris-again.md') => {
    const path1 = path.join(__dirname, '../content/blog-posts', filename);
    return fs.promises.readFile(path1, 'utf8');
  };
  return {loadBlogPostFromFile};
};

const parseRawPost = fileContent => {
  const tokens = marked.lexer(fileContent);
  const headline = tokens[0].text;
  const abstract = tokens[1].text;
  return {headline, abstract};
};

export const loadBlogPostList = ({loadBlogPostFromFile} = defaultDeps()) => async blogPostList => {
  const rawPosts = await Promise.all(blogPostList.map(async () => await loadBlogPostFromFile(/* TODO pass the date */)));
  const parsedPosts = rawPosts.map(parseRawPost);
  return parsedPosts.map((parsedPostData, index) => {
    return new BlogPost({
      dateCreated: blogPostList[index].dateCreated,
      ...parsedPostData
    });
  });
};
