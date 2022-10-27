'use strict';
const regex: RegExp = '[\uD800-\uDBFF][\uDC00-\uDFFF]';

const astralRegex: RegExp = (options: any) => options && options.exact ? new RegExp(`^${regex}$`) : new RegExp(regex, 'g');

module.exports = astralRegex;
