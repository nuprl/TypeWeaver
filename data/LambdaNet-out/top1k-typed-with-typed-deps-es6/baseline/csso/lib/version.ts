import { createRequire } from 'module';

const require: Function = createRequire(import.meta.url);

export const { version } = require('../package.json');
