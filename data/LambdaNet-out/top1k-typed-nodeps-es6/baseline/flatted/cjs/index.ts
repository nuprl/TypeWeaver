'use strict';
/*! (c) 2020 Andrea Giammarchi */

const {parse: $parse, stringify: $stringify} = JSON;
const {keys} = Object;

const Primitive: String = String;   // it could be Number
const primitive: String = 'string'; // it could be 'number'

const ignore: Function = {};
const object: String = 'object';

const noop: Function = (_: String, value: String) => value;

const primitives: Function = (value: String) => (
  value instanceof Primitive ? Primitive(value) : value
);

const Primitives: Function = (_: String, value: String) => (
  typeof value === primitive ? new Primitive(value) : value
);

const revive: Function = (input: Object, parsed: Map, output: Object, $: Function) => {
  const lazy: Array = [];
  for (let ke = keys(output), {length} = ke, y = 0; y < length; y++) {
    const k: String = ke[y];
    const value: String = output[k];
    if (value instanceof Primitive) {
      const tmp: String = input[value];
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

const set: Function = (known: Map, input: Array, value: String) => {
  const index: Number = Primitive(input.push(value) - 1);
  known.set(value, index);
  return index;
};

const parse: Function = (text: String, reviver: String) => {
  const input: Object = $parse(text, Primitives).map(primitives);
  const value: String = input[0];
  const $: Function = reviver || noop;
  const tmp: String = typeof value === object && value ?
              revive(input, new Set, value, $) :
              value;
  return $.call({'': tmp}, '', tmp);
};
exports.parse = parse;

const stringify: Function = (value: String, replacer: String, space: Array) => {
  const $: Function = replacer && typeof replacer === object ?
            (k: String, v: Number) => (k === '' || -1 < replacer.indexOf(k) ? v : void 0) :
            (replacer || noop);
  const known: Map = new Map;
  const input: Array = [];
  const output: Array = [];
  let i: Number = +set(known, input, $.call({'': value}, '', value));
  let firstRun: Boolean = !i;
  while (i < input.length) {
    firstRun = true;
    output[i] = $stringify(input[i++], replace, space);
  }
  return '[' + output.join(',') + ']';
  function replace(key: String, value: String): String {
    if (firstRun) {
      firstRun = !firstRun;
      return value;
    }
    const after: String = $.call(this, key, value);
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

const toJSON: Function = (any: Array) => $parse(stringify(any));
exports.toJSON = toJSON;
const fromJSON: Function = (any: Array) => parse($stringify(any));
exports.fromJSON = fromJSON;
