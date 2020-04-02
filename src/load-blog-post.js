import marked from 'marked';
import * as fs from 'fs';
import {BlogPost} from './BlogPost.js';

const prodDeps = () => {
  const loadBlogPostFromFile = async (filename) => fs.promises.readFile(filename, 'utf8');
  return {loadBlogPostFromFile};
};

const parseRawPost = fileContent => {
  const tokens = marked.lexer(fileContent);
  const headline = tokens[0].text;
  const abstract = tokens[1].text;
  return {headline, abstract};
};

export const loadBlogPostList = ({loadBlogPostFromFile} = prodDeps()) => async blogPostList => {
  const rawPosts = await Promise.all(blogPostList
    .map(async (blogPost) => await loadBlogPostFromFile(blogPost.filename)));
  const parsedPosts = rawPosts.map(parseRawPost);
  return parsedPosts.map((parsedPostData, index) => {
    return new BlogPost({
      dateCreated: blogPostList[index].dateCreated,
      ...parsedPostData
    });
  });
};
