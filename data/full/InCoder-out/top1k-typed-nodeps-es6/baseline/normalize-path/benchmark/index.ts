'use strict';

import path from 'path';
import suite from 'benchmarked';
const argv = process.argv.slice(2);
const code = argv[0] || '{current,v2}';

suite.run({ code: `code/${code}.js`, fixtures: 'fixtures/*.js' })
  .then(function(stats: Stats) {
    console.log(suite.render(stats));
  })
  .catch(console.error);