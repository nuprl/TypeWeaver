'use strict';

import Benchmark from 'benchmark';
import mime from '..';
import mimeLite from '../lite';

const suite: HTMLElement = new Benchmark.Suite();

const extensions: any[] = Object.keys(mime._types);
let idx: number = 0;

suite
  .add('mime.getType',
    function() {
      mime.getType(extensions[idx++]);
      if (idx >= extensions.length) idx = 0;
    }
  )
  .add('mimeLite.getType',
    function() {
      mimeLite.getType(extensions[idx++]);
      if (idx >= extensions.length) idx = 0;
    }
  )
  .on('cycle', function(event: object) {
    console.log(String(event.target));
  })
  .run();
