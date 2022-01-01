import { readFileSync } from 'fs';

const parseInputFile = (path) => readFileSync(path).toString().trim();

export { parseInputFile };
