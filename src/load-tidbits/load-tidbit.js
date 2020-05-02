import {readFile} from '../_deps/fs.js';

export class Tidbit {
  constructor() {
    this.url = '/tidbit/2000/01/a-tidbit/';
    this.dateCreated = '2000-01-01 10:00 CET';
    this.sourceFilename = '/app/test-content/tidbit/2000/01/index.md';
    this.headline = 'A Tidbit';
    this.abstract = 'This tidbit has ONLY the required data.';
  }
}
export const loadTidbits = async (sourceFiles) => {
  await readFile(sourceFiles[0].filename);
  return [new Tidbit()];
}
