const first2words = s => s.split(' ').slice(0, 2).join(' ');
export const findRelatedPosts = (post, postsToSearchIn) => {
  const findIn = postsToSearchIn.filter(p => p !== post);
  const words = first2words(post.headline);
  return findIn.filter(p => first2words(p.headline) === words);
};
