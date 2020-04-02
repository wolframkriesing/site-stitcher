import fs from 'fs';
import path from 'path';

export class BlogPost {
  static withDateCreated(dateCreated) {
    const blogPost = new BlogPost();
    blogPost.dateCreated = dateCreated;
    return blogPost;
  }
  constructor(attributes = {}) {
    Object.entries(attributes).forEach(([key, value]) => this[key] = value);
  }
  equals(blogPost) {
    return this.dateCreated === blogPost.dateCreated;
  }
}

export const buildBlogPostListFromFiles = (files, dir) => {
  return files.map(file => {
    const date = file.split('-')[0].replace(/\//g, '-');
    const blogPost = BlogPost.withDateCreated(date);
    blogPost.filename = path.join(dir, file);
    return blogPost;
  });
};

const defaultDeps = () => {
  const loadBlogPostFromFile = async (filename = '2018/05/13-jscoderetreat-13-tetris-again.md') => {
    const path1 = path.join(__dirname, '../content/blog-posts', filename);
    return fs.promises.readFile(path1, 'utf8');
  };

  return {loadBlogPostFromFile};
};

import marked from 'marked';
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

