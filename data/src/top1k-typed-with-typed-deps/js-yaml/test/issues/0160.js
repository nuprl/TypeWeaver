'use strict';


var assert = require('assert');
var yaml = require('../../');


it('Correct encoding of UTF-16 surrogate pairs', function () {
  assert.strictEqual(yaml.load('"\\U0001F431"'), '🐱');
});
