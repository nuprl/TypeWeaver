'use strict';

import path from 'path';
import suite from 'benchmarked';
const argv: Object = process.argv.slice(2);
const code: String = argv[0] || '{current,v2}';

suite.run({ code: `code/${code}.js`, fixtures: 'fixtures/*.js' })
  .then(function(stats: Object) {
    console.log(suite.render(stats));
  })
  .catch(console.error);
