import { version } from './version.js';
import * as syntax from './syntax.js';
import * as utils from './utils.js';
declare function minifyStylesheet(source: string, options: object): string;
declare function minifyBlock(source: string, options: object): string;
export { version, utils, minifyStylesheet as minify, minifyBlock, syntax };
