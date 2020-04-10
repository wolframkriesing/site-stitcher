import {describe, it} from 'mocha';
import assert from 'assert';
import {assertThat, equalTo, hasProperties} from 'hamjest';

const askForHeadline = async (askUser) => {
  let headline = '';
  while (headline === '') {
    headline = await askUser('Headline: ');
  }
  return headline;
}

const collectBlogPostData = ({askUser}) => async () => {
  const post = {};
  post.headline = await askForHeadline(askUser);
  return post;
};

describe('Script for creating a new blog post skeleton', () => {
  it('WHEN asking user for the headline THEN ask for "Headline: "', async () => {
    let questionAsked = '';
    const askUser = async question => { questionAsked = question; return 'a headline'; };
    await collectBlogPostData({askUser})();
    assert.strictEqual(questionAsked, 'Headline: ');
  });
  it('WHEN user enters no headline THEN ask again until there is one', async () => {
    const questionsAsked = [];
    const answers = ['', '', '', '', 'a headline'];
    const askUser = async question => { questionsAsked.push(question); return answers.shift(); };
    await collectBlogPostData({askUser})();
    assert.deepStrictEqual(questionsAsked, ['Headline: ', 'Headline: ', 'Headline: ', 'Headline: ', 'Headline: ']);
  });
  it('WHEN headline is given THEN set it as `headline`', async () => {
    const askUser = async q => 'user-entered title';
    const postData = await collectBlogPostData({askUser})();
    assertThat(postData, {headline: 'user-entered title'});
  });
  it('if asking for a title and user enters nothing, ask again', () => {
    
  });
});