import {writeOutputFile} from '../_deps/fs.js';
import {renderTemplate} from '../_deps/render-template.js';

/**
 * @param data {PlainObject}
 * @return {string}
 */
const renderTagPage = (data) => renderTemplate('blog/tag.html', data);

export const renderAndWriteTagPages = ({writeFile = writeOutputFile, renderPage = renderTagPage} = {}) => async (groups, renderParams) => {
  const destFilename = tagSlug => `/blog/tag/${tagSlug}/index.html`;
  const writeGroup = group => writeFile(destFilename(group.tagSlug), renderPage({...renderParams, tag: group.tagSlug, posts: group.blogPosts}));
  const pageWriters = groups.map(writeGroup);
  await Promise.all(pageWriters);
}

