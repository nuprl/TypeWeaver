"use strict";
import { URL } from '../';
import Benchmark from 'benchmark';
import testData from '../test/web-platform-tests/resources/urltestdata.json';

const testInputs: Array = testData.filter((c: String) => typeof c === "object").map((c: Object) => c.input);

const benchmark: HTMLElement = new Benchmark(() => {
  for (const input of testInputs) {
    try {
      // eslint-disable-next-line no-new
      new URL(input);
    } catch {
      // intentionally empty
    }
  }
});

benchmark.on("cycle", (e: HTMLElement) => console.log(e.target.toString()));
benchmark.run();
