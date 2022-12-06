"use strict";

/* eslint-disable no-console */
import xnv from '..';

import Benchmark from 'benchmark';
import assert from 'assert';
import cases from '../test/cases.json';

const benchmark = new Benchmark(() => {
  for (const input of cases.name.valid) {
    assert.strictEqual(xnv.name(input), true);
  }
  for (const input of cases.name.invalid) {
    assert.strictEqual(xnv.name(input), false);
    assert.strictEqual(xnv.qname(input), false);
  }
  for (const input of cases.qname.valid) {
    assert.strictEqual(xnv.qname(input), true);
  }
  for (const input of cases.qname.invalid) {
    assert.strictEqual(xnv.qname(input), false);
  }
});

benchmark.on("cycle", e => console.log(e.target.toString()));
benchmark.run();
