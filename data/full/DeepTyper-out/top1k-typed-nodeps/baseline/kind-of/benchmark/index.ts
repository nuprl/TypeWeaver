'use strict';

var path: any = require('path');
var suite: any = require('benchmarked');
var write: any = require('write');

suite.run({
  fixtures: 'fixtures/*.js',
  code: 'code/{kind-of,lib-*}.js'
})
  .then(function(stats: any) {
    write.sync(path.join(__dirname, 'stats.json'), JSON.stringify(stats, null, 2))
    write.sync(path.join(__dirname, 'stats.md'), suite.render(stats));
  })
  .catch(console.error);
