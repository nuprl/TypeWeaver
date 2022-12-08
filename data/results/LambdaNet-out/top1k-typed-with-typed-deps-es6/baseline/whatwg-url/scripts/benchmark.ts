"use strict";
import { URL } from '../';
import Benchmark from 'benchmark';
import testData from '../test/web-platform-tests/resources/urltestdata.json';

const testInputs: any[] = testData.filter((c: string) => typeof c === "object").map((c: object) => c.input);

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
