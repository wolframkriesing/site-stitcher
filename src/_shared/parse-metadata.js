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
 * @returns {boolean}
 */
const findMetadataByKeyAsBoolean = (lines, key) => findMetadataByKeyAsString(lines, key) === 'true';
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
 * @param keyConfig {import("./parse-metadata").MetadataParseConfig}
 * @returns {[*, string] | [*, string[]] | [*, boolean]}
 */
const parseMetadataKey = (lines, keyConfig) => {
  const key = keyConfig.key;
  switch (keyConfig.type) {
    case 'boolean':
      return [key, findMetadataByKeyAsBoolean(lines, key)];
    case 'string':
      return [key, findMetadataByKeyAsString(lines, key)];
    case 'array':
      return [key, findMetadataByKeyAsArray(lines, key, keyConfig.separator)];
  }
}
/**
 * @param token {marked.Token}
 * @param configs {import("./parse-metadata").MetadataParseConfig[]}
 * @returns {import("../BlogPost").BlogPostMetadata | import("../load-tidbit/Tidbit").TidbitMetadata}
 */
export const parseMetadata = (token, configs) => {
  const lines = token.type === 'paragraph' ? token.text.split('\n') : [];
  const metadata = configs.map(keyConfig => parseMetadataKey(lines, keyConfig));
  return Object.fromEntries(metadata);
}
