import * as path from 'path';

const root = '/app';
export const CONTENT_DIRECTORY = path.join(root, 'content');
export const BLOG_POSTS_DIRECTORY = path.join(CONTENT_DIRECTORY, 'blog-posts');
export const TEMPLATES_DIRECTORY = path.join(root, 'src/templates');
export const OUTPUT_DIRECTORY = path.join(root, '_output');


export const blogPostsDirectory = BLOG_POSTS_DIRECTORY; // deprecated, use BLOG_POSTS_DIRECTORY
