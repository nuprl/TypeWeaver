'use strict';

var keys: Object = require('object-keys').shim();
delete keys.shim;

import assign from './';

export default assign.shim();

delete assign.shim;
