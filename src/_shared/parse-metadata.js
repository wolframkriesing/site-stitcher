/**
 * @param {string[]} lines
 * @param {string} key
 * @returns {string}
 */
const findMetadataByKeyAsString = (lines, key) => {
  const prefix = key + ':';
  const foundLines = lines.filter(line => line.startsWith(prefix));
  if (foundLines.length === 0) return '';
  return foundLines[0].replace(prefix, '').trim();
};
/**
 * @param {string[]} lines
 * @param {string} key
 * @param {string} separator
 * @returns {string[]}
 */
const findMetadataByKeyAsArray = (lines, key, separator) => {
  const string = findMetadataByKeyAsString(lines, key).trim();
  if (string.length === 0) return [];
  return string.split(separator).map(s => s.trim());
};
/**
 * @param 
 * @returns {BlogPostMetadata}
 */
export const parseMetadata = (token) => {
  const metadata = {tags: [], oldUrls: []};
  if (token.type === 'paragraph') {
    const lines = token.text.split('\n');
    const dateCreated = findMetadataByKeyAsString(lines, 'dateCreated');
    if (dateCreated) metadata.dateCreated = dateCreated;
    metadata.tags = findMetadataByKeyAsArray(lines, 'tags', ',');
    metadata.oldUrls = findMetadataByKeyAsArray(lines, 'oldUrls', ' ');
    metadata.youtubeId = findMetadataByKeyAsString(lines, 'youtubeId');
    metadata.vimeoId = findMetadataByKeyAsString(lines, 'vimeoId');
    metadata.videoStartTime = findMetadataByKeyAsString(lines, 'videoStartTime');
  }
  return metadata;
}
