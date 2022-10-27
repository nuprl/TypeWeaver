'use strict';

var path: String = require('path');
var suite: Array = require('benchmarked');
var write: Array = require('write');

suite.run({
  fixtures: 'fixtures/*.js',
  code: 'code/{kind-of,lib-*}.js'
})
  .then(function(stats: Object) {
    write.sync(path.join(__dirname, 'stats.json'), JSON.stringify(stats, null, 2))
    write.sync(path.join(__dirname, 'stats.md'), suite.render(stats));
  })
  .catch(console.error);
