import * as path from 'path';

const root = process.env.ROOT_DIRECTORY || '/app';
export const CONTENT_DIRECTORY = path.join(root, 'content');
export const TEST_CONTENT_DIRECTORY = path.join(root, 'test-content');
export const BLOG_POSTS_DIRECTORY = path.join(CONTENT_DIRECTORY, 'blog-posts');
export const TEMPLATES_DIRECTORY = path.join(root, 'templates');
export const OUTPUT_DIRECTORY = path.join(root, '_output');
