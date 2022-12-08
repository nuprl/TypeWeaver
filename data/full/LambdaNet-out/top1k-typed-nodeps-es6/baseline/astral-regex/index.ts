'use strict';
const regex: string = '[\uD800-\uDBFF][\uDC00-\uDFFF]';

const astralRegex: Function = (options: object) => options && options.exact ? new RegExp(`^${regex}$`) : new RegExp(regex, 'g');

export default astralRegex;
