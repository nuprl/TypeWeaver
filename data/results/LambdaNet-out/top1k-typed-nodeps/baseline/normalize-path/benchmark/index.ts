'use strict';

const path: string = require('path');
const suite: any[] = require('benchmarked');
const argv: object = process.argv.slice(2);
const code: string = argv[0] || '{current,v2}';

suite.run({ code: `code/${code}.js`, fixtures: 'fixtures/*.js' })
  .then(function(stats: object) {
    console.log(suite.render(stats));
  })
  .catch(console.error);
