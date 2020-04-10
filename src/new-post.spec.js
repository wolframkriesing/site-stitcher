import {describe, it} from 'mocha';
import assert from 'assert';
import {assertThat, hasProperties} from 'hamjest';

/**
 * @param {function(): Promise<string>} askUser
 * @returns {function(*): function(*): Promise<string>}
 */
const askForRequiredField = (askUser) => async (text) => {
  let headline;
  do {
    headline = await askUser(`${text}: `);
  } while (!headline);
  return headline;
}

const collectBlogPostData = ({askUser}) => async () => {
  const post = {};
  post.headline = await askForRequiredField(askUser)('Headline');
  post.abstract = await askForRequiredField(askUser)('Abstract');
  post.tags = (await askForRequiredField(askUser)('Tags')).split(',');
  return post;
};

describe('Script for creating a new blog post skeleton', () => {
  describe('WHEN asking the user to enter the data', () => {
    it('THEN ask for headline, abstract and tags', async () => {
      const questionsAsked = [];
      const answers = ['a headline', 'an abstract', 'tags'];
      const askUser = async question => { questionsAsked.push(question); return answers.shift(); };
      await collectBlogPostData({askUser})();
      assert.deepStrictEqual(questionsAsked, ['Headline: ', 'Abstract: ', 'Tags: ']);
    });
    it('AND any is missing THEN ask until each is entered', async () => {
      const questionsAsked = [];
      const noAnswer = '';
      const answers = [noAnswer, 'a headline', noAnswer, noAnswer, 'an abstract', noAnswer, 'tags'];
      const askUser = async question => { questionsAsked.push(question); return answers.shift(); };
      await collectBlogPostData({askUser})();
      assert.deepStrictEqual(questionsAsked, [
        'Headline: ', 'Headline: ',
        'Abstract: ', 'Abstract: ', 'Abstract: ',
        'Tags: ', 'Tags: ',
      ]);
    });
  });
  describe('WHEN data are entered', async () => {
    const postData = async () => {
      const answers = ['headline', 'abstract', 'tags'];
      const askUser = async q => answers.shift();
      return await collectBlogPostData({askUser})();
    };
    it('WHEN data are entered THEN return them in the according property', async () => {
      assertThat(await postData(), hasProperties({headline: 'headline', abstract: 'abstract'}));
    });
    it('THEN tags are returns as array', async () => {
      assertThat(await postData(), hasProperties({tags: ['tags']}));
    });
  });
});