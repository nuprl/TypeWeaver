"use strict";
/* eslint-disable no-console */
const xnv: any = require("..");
const Benchmark: any = require("benchmark");
const assert: any = require("assert");
const cases: any = require("../test/cases.json");

const benchmark: any = new Benchmark(() => {
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

benchmark.on("cycle", (e: any) => console.log(e.target.toString()));
benchmark.run();
