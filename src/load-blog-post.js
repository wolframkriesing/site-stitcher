import marked from 'marked';
import * as fs from 'fs';
import {BlogPost} from './BlogPost.js';

const prodDeps = () => {
  const loadBlogPostFromFile = async (filename) => fs.promises.readFile(filename, 'utf8');
  return {loadBlogPostFromFile};
};

const findParagraphAfterH1 = (tokens) => {
  let tokenIndex = 0;
  let h1Found = false;
  while (tokenIndex < tokens.length && !h1Found) {
    const t = tokens[tokenIndex];
    if (t.type === 'heading' && t.depth === 1) h1Found = true;
    tokenIndex++;
  }

  let paragraphAfterH1 = '';
  while (tokenIndex < tokens.length && paragraphAfterH1 === '') {
    const t = tokens[tokenIndex];
    if (t.type === 'paragraph') paragraphAfterH1 = t.text;
    tokenIndex++;
  }

  return paragraphAfterH1;
}

const parseRawPost = fileContent => {
  const tokens = marked.lexer(fileContent);
  const headline = tokens[0].text;
  const abstract = findParagraphAfterH1(tokens);
  return {headline, abstract};
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
