'use strict';

import bind from 'function-bind';

export default bind.call(Function.call, Object.prototype.hasOwnProperty);