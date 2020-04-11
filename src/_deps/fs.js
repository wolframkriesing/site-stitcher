import * as fs from 'fs';

export const readFile = async (filename) => fs.promises.readFile(filename, 'utf8');