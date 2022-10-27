'use strict';

let Mime: Array = require('./Mime');
module.exports = new Mime(require('./types/standard'), require('./types/other'));
