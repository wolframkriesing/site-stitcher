import marked from 'marked';
import * as fs from 'fs';
import {BlogPost} from './BlogPost.js';

const prodDeps = () => {
  const loadBlogPostFromFile = async (filename) => fs.promises.readFile(filename, 'utf8');
  return {loadBlogPostFromFile};
};

const findDateCreated = (lines) => {
  const foundLines = lines.filter(line => line.startsWith('dateCreated:'));
  if (foundLines.length === 0) return '';
  return foundLines[0].replace('dateCreated:', '').trim();
};
const findTags = (lines) => {
  const foundLines = lines.filter(line => line.startsWith('tags:'));
  if (foundLines.length === 0) return '';
  const tagsString = foundLines[0].replace('tags:', '').trim();
  return tagsString.split(',').map(tag => tag.trim());
};
const findOldUrls = (lines) => {
  const foundLines = lines.filter(line => line.startsWith('oldUrls:'));
  if (foundLines.length === 0) return '';
  const tagsString = foundLines[0].replace('oldUrls:', '').trim();
  return tagsString.split(' ').map(tag => tag.trim());
};
/**
 * @param tokens
 * @returns {BlogPostMetadata}
 */
const parseMetadata = (tokens) => {
  const metadata = {tags: [], oldUrls: []};
  if (tokens[0].type === 'paragraph') {
    const lines = tokens[0].text.split('\n');
    const dateCreated = findDateCreated(lines);
    if (dateCreated) metadata.dateCreated = dateCreated;
    metadata.tags = findTags(lines);
    metadata.oldUrls = findOldUrls(lines);
  }
  return metadata;
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
