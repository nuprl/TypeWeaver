'use strict';
const regex: String = '[\uD800-\uDBFF][\uDC00-\uDFFF]';

const astralRegex: Function = (options: Object) => options && options.exact ? new RegExp(`^${regex}$`) : new RegExp(regex, 'g');

export default astralRegex;
