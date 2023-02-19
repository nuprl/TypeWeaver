'use strict';
/*! (c) 2020 Andrea Giammarchi */

const {parse: $parse, stringify: $stringify} = JSON;
const {keys} = Object;

const Primitive: any = String;   // it could be Number
const primitive: string = 'string'; // it could be 'number'

const ignore: {} = {};
const object: any = 'object';

const noop: void = (_: any, value: any) => value;

const primitives: any = (value: any) => (
  value instanceof Primitive ? Primitive(value) : value
);

const Primitives: any = (_: any, value: any) => (
  typeof value === primitive ? new Primitive(value) : value
);

const revive: any = (input: any, parsed: any, output: any, $) => {
  const lazy: any[] = [];
  for (let ke = keys(output), {length} = ke, y = 0; y < length; y++) {
    const k: any = ke[y];
    const value: any = output[k];
    if (value instanceof Primitive) {
      const tmp: any = input[value];
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

const set = (known: any, input: any, value: any) => {
  const index: any = Primitive(input.push(value) - 1);
  known.set(value, index);
  return index;
};

const parse: any = (text: any, reviver: any) => {
  const input: any = $parse(text, Primitives).map(primitives);
  const value: any = input[0];
  const $ = reviver || noop;
  const tmp: any = typeof value === object && value ?
              revive(input, new Set, value, $) :
              value;
  return $.call({'': tmp}, '', tmp);
};
exports.parse = parse;

const stringify: any = (value: any, replacer: any, space: any) => {
  const $ = replacer && typeof replacer === object ?
            (k: string, v: any) => (k === '' || -1 < replacer.indexOf(k) ? v : void 0) :
            (replacer || noop);
  const known: any = new Map;
  const input: any[] = [];
  const output: any[] = [];
  let i: number = +set(known, input, $.call({'': value}, '', value));
  let firstRun: boolean = !i;
  while (i < input.length) {
    firstRun = true;
    output[i] = $stringify(input[i++], replace, space);
  }
  return '[' + output.join(',') + ']';
  function replace(key: string, value: any): any {
    if (firstRun) {
      firstRun = !firstRun;
      return value;
    }
    const after: any = $.call(this, key, value);
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

const toJSON: any = any => $parse(stringify(any));
exports.toJSON = toJSON;
const fromJSON: any = any => parse($stringify(any));
exports.fromJSON = fromJSON;
