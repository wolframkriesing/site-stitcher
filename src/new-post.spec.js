import {describe, it} from 'mocha';
import assert from 'assert';
import {assertThat, equalTo, hasProperties} from 'hamjest';

const askForRequiredField = (askUser) => async (text) => {
  let headline = '';
  while (headline === '') {
    headline = await askUser(`${text}: `);
  }
  return headline;
}

const collectBlogPostData = ({askUser}) => async () => {
  const post = {};
  post.headline = await askForRequiredField(askUser)('Headline');
  post.abstract = await askForRequiredField(askUser)('Abstract');
  return post;
};

describe('Script for creating a new blog post skeleton', () => {
  it('WHEN asking user for the headline THEN ask for "Headline: "', async () => {
    const questionsAsked = [];
    const askUser = async question => { questionsAsked.push(question); return 'a headline'; };
    await collectBlogPostData({askUser})();
    assert.strictEqual(questionsAsked[0], 'Headline: ');
  });
  it('WHEN user enters no headline THEN ask again until there is one', async () => {
    const questionsAsked = [];
    const answers = ['', '', '', '', 'a headline'];
    const askUser = async question => { questionsAsked.push(question); return answers.shift(); };
    await collectBlogPostData({askUser})();
    assert.deepStrictEqual(questionsAsked.slice(0, 5), ['Headline: ', 'Headline: ', 'Headline: ', 'Headline: ', 'Headline: ']);
  });
  it('WHEN headline is given THEN return it as `headline`', async () => {
    const askUser = async q => 'user-entered title';
    const postData = await collectBlogPostData({askUser})();
    assertThat(postData, hasProperties({headline: 'user-entered title'}));
  });
  it('WHEN asking for an abstract THEN ask for "Abstract: " until there is one', async () => {
    const questionsAsked = [];
    const answers = ['a headline', '', 'an abstract'];
    const askUser = async question => { questionsAsked.push(question); return answers.shift(); };
    await collectBlogPostData({askUser})();
    assert.deepStrictEqual(questionsAsked, ['Headline: ', 'Abstract: ', 'Abstract: ']);
  });
  it('WHEN abstract is given THEN return it as `abstract`', async () => {
    const askUser = async q => 'an abstract';
    const postData = await collectBlogPostData({askUser})();
    assertThat(postData, hasProperties({abstract: 'an abstract'}));
  });
});