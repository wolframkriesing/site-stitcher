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
 * @param marked token
 * @param {{key: string, type: 'string'} | {key: string, type: 'array', separator: string}}
 * @returns {BlogPostMetadata}
 */
export const parseMetadata = (token, configs) => {
  const lines = token.type === 'paragraph' ? token.text.split('\n') : [];
  const metadata = configs.map(config => {
    switch (config.type) {
      case 'string': 
        return [config.key, findMetadataByKeyAsString(lines, config.key)];
      case 'array': 
        return [config.key, findMetadataByKeyAsArray(lines, config.key, config.separator)];
    }
  });
  return Object.fromEntries(metadata);
}
