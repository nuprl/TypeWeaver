'use strict';
/*! (c) 2020 Andrea Giammarchi */

const {parse: $parse, stringify: $stringify} = JSON;
const {keys} = Object;

const Primitive: string = String;   // it could be Number
const primitive: string = 'string'; // it could be 'number'

const ignore: Function = {};
const object: string = 'object';

const noop: Function = (_: string, value: string) => value;

const primitives: Function = (value: string) => (
  value instanceof Primitive ? Primitive(value) : value
);

const Primitives: Function = (_: string, value: string) => (
  typeof value === primitive ? new Primitive(value) : value
);

const revive: Function = (input: object, parsed: Map, output: object, $: Function) => {
  const lazy: any[] = [];
  for (let ke = keys(output), {length} = ke, y = 0; y < length; y++) {
    const k: string = ke[y];
    const value: string = output[k];
    if (value instanceof Primitive) {
      const tmp: string = input[value];
      if (typeof tmp === object && !parsed.has(tmp)) {
        parsed.add(tmp);
        output[k] = ignore;
        lazy.push({k, a: [input, parsed, tmp, $]});
      }
      else
        output[k] = $.call(output, k, tmp);
    }
    else if (output[k] !== ignore)
      output[k] = $.call(output, k, value);
  }
  for (let {length} = lazy, i = 0; i < length; i++) {
    const {k, a} = lazy[i];
    output[k] = $.call(output, k, revive.apply(null, a));
  }
  return output;
};

const set: Function = (known: Map, input: any[], value: string) => {
  const index: number = Primitive(input.push(value) - 1);
  known.set(value, index);
  return index;
};

const parse: Function = (text: string, reviver: string) => {
  const input: object = $parse(text, Primitives).map(primitives);
  const value: string = input[0];
  const $: Function = reviver || noop;
  const tmp: string = typeof value === object && value ?
              revive(input, new Set, value, $) :
              value;
  return $.call({'': tmp}, '', tmp);
};
exports.parse = parse;

const stringify: Function = (value: string, replacer: string, space: any[]) => {
  const $: Function = replacer && typeof replacer === object ?
            (k: string, v: number) => (k === '' || -1 < replacer.indexOf(k) ? v : void 0) :
            (replacer || noop);
  const known: Map = new Map;
  const input: any[] = [];
  const output: any[] = [];
  let i: number = +set(known, input, $.call({'': value}, '', value));
  let firstRun: boolean = !i;
  while (i < input.length) {
    firstRun = true;
    output[i] = $stringify(input[i++], replace, space);
  }
  return '[' + output.join(',') + ']';
  function replace(key: string, value: string): string {
    if (firstRun) {
      firstRun = !firstRun;
      return value;
    }
    const after: string = $.call(this, key, value);
    switch (typeof after) {
      case object:
        if (after === null) return after;
      case primitive:
        return known.get(after) || set(known, input, after);
    }
    return after;
  }
};
exports.stringify = stringify;

const toJSON: Function = (any: any[]) => $parse(stringify(any));
exports.toJSON = toJSON;
const fromJSON: Function = (any: any[]) => parse($stringify(any));
exports.fromJSON = fromJSON;
