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
  const lines = token.type === 'paragraph' ? token.text.split('\n') : [];
  const configs = [
    {key: 'dateCreated', type: 'string'},
    {key: 'oldUrls', type: 'array', separator: ' '},
    {key: 'tags', type: 'array', separator: ','},
    {key: 'videoStartTime', type: 'string'},
    {key: 'vimeoId', type: 'string'},
    {key: 'youtubeId', type: 'string'},
  ];
  configs.forEach(config => {
    switch (config.type) {
      case 'string': 
        metadata[config.key] = findMetadataByKeyAsString(lines, config.key);
        break;
      case 'array': 
        metadata[config.key] = findMetadataByKeyAsArray(lines, config.key, config.separator);
        break;
    }
  });
  return metadata;
}
