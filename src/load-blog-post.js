import marked from 'marked';
import * as fs from 'fs';
import {BlogPost} from './BlogPost.js';

const prodDeps = () => {
  const loadBlogPostFromFile = async (filename) => fs.promises.readFile(filename, 'utf8');
  return {loadBlogPostFromFile};
};

/**
 * @param tokens
 * @returns {BlogPostMetadata}
 */
const parseMetadata = (tokens) => {
  if (tokens[0].type === 'paragraph') {
    const lines = tokens[0].text.split('\n');
    const dateCreated = lines.filter(line => line.startsWith('dateCreated:')).map(s => s.replace('dateCreated: ', '').trim())[0];
    return {dateCreated};
  }
  return {};
}

const findHeadlineAndAbstract = (tokens) => {
  let tokenIndex = 0;
  let headline = '';
  while (tokenIndex < tokens.length && headline === '') {
    const t = tokens[tokenIndex];
    if (t.type === 'heading' && t.depth === 1) headline = t.text;
    tokenIndex++;
  }

  let abstract = '';
  while (tokenIndex < tokens.length && abstract === '') {
    const t = tokens[tokenIndex];
    if (t.type === 'paragraph') abstract = t.text;
    tokenIndex++;
  }

  return {headline, abstract};
}

const parseRawPost = fileContent => {
  const tokens = marked.lexer(fileContent);
  const {headline, abstract} = findHeadlineAndAbstract(tokens);
  const metadata = parseMetadata(tokens);
  return {headline, abstract, ...metadata};
};

export const loadBlogPostList = ({loadBlogPostFromFile} = prodDeps()) => async blogPostList => {
  const loadPost = loadBlogPost({loadBlogPostFromFile});
  return await Promise.all(blogPostList.map(async (blogPost) => await loadPost(blogPost)));
};

export const loadBlogPost = ({loadBlogPostFromFile}) => async (blogPost) => {
  const rawPost = await loadBlogPostFromFile(blogPost.markdownFilename);
  const parsedPostData = parseRawPost(rawPost);
  return blogPost.cloneAndOverrideWith(parsedPostData);
}
