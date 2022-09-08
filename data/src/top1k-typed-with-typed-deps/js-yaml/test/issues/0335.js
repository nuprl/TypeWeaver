'use strict';


var assert = require('assert');
var yaml = require('../../');


it('Don\'t throw on warning', function () {
  var src = `
not_num_1: -_123
not_num_2: _123
not_num_3: 123_
not_num_4: 0b00_
not_num_5: 0x00_
not_num_6: 011_
`;

  assert.deepStrictEqual(yaml.load(src), {
    not_num_1: '-_123',
    not_num_2: '_123',
    not_num_3: '123_',
    not_num_4: '0b00_',
    not_num_5: '0x00_',
    not_num_6: '011_'
  });
});
