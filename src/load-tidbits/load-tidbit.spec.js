import {describe, it} from 'mocha';
import assert from 'assert';
import {assertThat, instanceOf, hasProperties} from 'hamjest';

class Tidbit {
  constructor() {
    this.url = '/tidbit/2111/a-tidbit/';
    this.dateCreated = '2111-11-11 11:11 CET';
    this.sourceFilename = '/app/test-content/tidbit/2000/01/index.md';
    this.headline = 'A Tidbit';
    this.abstract = 'One paragraph';
    this.tags = [];
  }
  static withRawData() {
    return new Tidbit();
  }
}

const loadTidbitFile = () => {
  return [Tidbit.withRawData({})];
}

describe('Load a tidbit file (one month)', () => {
  describe('GIVEN one tidbit in it WHEN tidbit has all required data (headline, dateCreated, paragraph)', () => {
    const load = () => {
      const fileContent = [
        '# A Tidbit', '',
        'dateCreated: 2111-11-11 11:11 CET', '',
        'One paragraph'
      ];
      return loadTidbitFile(fileContent);
    };
    it('THEN find one tidbit', () => {
      assert.equal(load().length, 1);
    });
    it('THEN this one be a Tidbit instance', () => {
      assertThat(load()[0], instanceOf(Tidbit));
    });
    it('THEN it has the headline "A Tidbit"', () => {
      assertThat(load()[0].headline, 'A Tidbit');
    });
    it('THEN it has the dateCreated = 2111-11-11 11:11 CET', () => {
      assertThat(load()[0].dateCreated, '2111-11-11 11:11 CET');
    });
    it('THEN it has the url = /tidbit/2111/a-tidbit/', () => {
      assertThat(load()[0].url, '/tidbit/2111/a-tidbit/');
    });
    it('THEN it has the abstract = "One paragraph"', () => {
      assertThat(load()[0].abstract, 'One paragraph');
    });
    it('THEN it has not tags', () => {
      assertThat(load()[0], hasProperties({tags: []}));
    });
    // tags
    // main tag
  });
});
