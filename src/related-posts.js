const first2words = s => s.replace(',', '').split(' ').slice(0, 2).join(' ');
const findMatchOfFirstTwoWords = (findIn, post) => {
  const words = first2words(post.headline);
  return findIn.filter(p => first2words(p.headline) === words);
};
const firstWord = s => s.replace(',', '').split(' ')[0];
const findMatchByFirstWord = (post, findIn) => {
  const word = firstWord(post.headline);
  return findIn.filter(p => firstWord(p.headline) === word);
}
export const findRelatedPosts = (post, findIn) => {
  const found = findMatchOfFirstTwoWords(findIn, post);
  return found.length === 1 ? findMatchByFirstWord(post, findIn) : found;
};
