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
 * @param lines {string[]}
 * @param keyConfig {{key: string, type: 'string'} | {key: string, type: 'array', separator: string}}
 * @returns {[*, string]|[*, string[]]}
 */
const parseMetadataKey = (lines, keyConfig) => {
  const key = keyConfig.key;
  switch (keyConfig.type) {
    case 'string':
      return [key, findMetadataByKeyAsString(lines, key)];
    case 'array':
      return [key, findMetadataByKeyAsArray(lines, key, keyConfig.separator)];
  }
}
/**
 * @param token {marked.Token}
 * @param configs {[{key: string, type: 'string'} | {key: string, type: 'array', separator: string}]}
 * @returns {import("../BlogPost").BlogPostMetadata}
 */
export const parseMetadata = (token, configs) => {
  const lines = token.type === 'paragraph' ? token.text.split('\n') : [];
  const metadata = configs.map(keyConfig => parseMetadataKey(lines, keyConfig));
  return Object.fromEntries(metadata);
}
