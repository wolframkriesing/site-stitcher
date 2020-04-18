const stopWords = [
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours",
  "ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"
];
const stopWordsRegex = new RegExp('(\\b(' + stopWords.join('|') + ')\\b\\s*)', 'gi')
const withoutStopWords = s => s.replace(stopWordsRegex, '').trim();

const first2words = s => s.replace(',', '').split(' ').slice(0, 2).join(' ').toLowerCase();
const findMatchOfFirstTwoWords = (findIn, post) => {
  const words = first2words(withoutStopWords(post.headline));
  return findIn.filter(p => p === post || first2words(withoutStopWords(p.headline)) === words);
};
const firstWord = s => s.replace(',', '').split(' ')[0].toLowerCase();
const findMatchByFirstWord = (post, findIn) => {
  const word = firstWord(withoutStopWords(post.headline));
  return findIn.filter(p => firstWord(withoutStopWords(p.headline)) === word);
}
export const findRelatedPosts = (post, findIn) => {
  const found = findMatchOfFirstTwoWords(findIn, post);
  return found.length === 1 ? findMatchByFirstWord(post, findIn) : found;
};
