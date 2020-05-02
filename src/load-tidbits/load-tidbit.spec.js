import {describe, it} from 'mocha';
import assert from 'assert';

const loadTidbitFile = () => {
  return [{}];
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
    // tags
    // main tag
  });
});
