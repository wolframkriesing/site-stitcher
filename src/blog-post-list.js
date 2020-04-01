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

export const buildBlogPostListFromFiles = files => {
  return files.map(file => {
    const date = file.split('-')[0].replace(/\//g, '-');
    return BlogPost.withDateCreated(date);
  });
};

import fs from 'fs';
import path from 'path';

const defaultDeps = () => {
  const loadBlogPostingFromFile = async (filename = '2018/05/13-jscoderetreat-13-tetris-again.md') => {
    const path1 = path.join(__dirname, '../blog-posts', filename);
    return fs.promises.readFile(path1, 'utf8');
  };

  return {loadBlogPostingFromFile};
};

const parseRawPost = fileContent => {
  const lines = fileContent.split('\n');
  const headline = lines[0].replace('# ', '');
  const abstract = lines.slice(2, 7).join('\n');
  return {headline, abstract};
};

export const loadBlogPostList = ({loadBlogPostingFromFile} = defaultDeps()) => async blogPostingList => {
  const rawPosts = await Promise.all(blogPostingList.map(async () => await loadBlogPostingFromFile(/* TODO pass the date */)));
  const parsedPosts = rawPosts.map(parseRawPost);
  return parsedPosts.map((parsedPostData, index) => {
    return new BlogPost({
      dateCreated: blogPostingList[index].dateCreated,
      ...parsedPostData
    });
  });
};

