self.Flatted = (function (exports: object) {
  'use strict';

  function _typeof(obj: string): boolean {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj: string) {
      return typeof obj;
    } : function (obj: object) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  /*! (c) 2020 Andrea Giammarchi */
  var $parse: Function = JSON.parse,
      $stringify: object = JSON.stringify;
  var keys: Function = Object.keys;
  var Primitive: string = String; // it could be Number

  var primitive: string = 'string'; // it could be 'number'

  var ignore: Function = {};
  var object: string = 'object';

  var noop: number = function noop(_: string, value: string): string {
    return value;
  };

  var primitives: Function = function primitives(value: string): string {
    return value instanceof Primitive ? Primitive(value) : value;
  };

  var Primitives: Function = function Primitives(_: string, value: string): string {
    return _typeof(value) === primitive ? new Primitive(value) : value;
  };

  var revive: Function = function revive(input: object, parsed: object, output: object, $: Function): object {
    var lazy: any[] = [];

    for (var ke = keys(output), length = ke.length, y = 0; y < length; y++) {
      var k: string = ke[y];
      var value: string = output[k];

      if (value instanceof Primitive) {
        var tmp: string = input[value];

        if (_typeof(tmp) === object && !parsed.has(tmp)) {
          parsed.add(tmp);
          output[k] = ignore;
          lazy.push({
            k: k,
            a: [input, parsed, tmp, $]
          });
        } else output[k] = $.call(output, k, tmp);
      } else if (output[k] !== ignore) output[k] = $.call(output, k, value);
    }

    for (var _length = lazy.length, i = 0; i < _length; i++) {
      var _lazy$i: object = lazy[i],
          _k: any[] = _lazy$i.k,
          a: any[] = _lazy$i.a;
      output[_k] = $.call(output, _k, revive.apply(null, a));
    }

    return output;
  };

  var set: Function = function set(known: Map, input: any[], value: string): string {
    var index: string = Primitive(input.push(value) - 1);
    known.set(value, index);
    return index;
  };

  var parse: Function = function parse(text: string, reviver: string): string {
    var input: object = $parse(text, Primitives).map(primitives);
    var value: string = input[0];
    var $: Function = reviver || noop;
    var tmp: string = _typeof(value) === object && value ? revive(input, new Set(), value, $) : value;
    return $.call({
      '': tmp
    }, '', tmp);
  };
  var stringify: Function = function stringify(value: string, replacer: string, space: Function): string {
    var $: Function = replacer && _typeof(replacer) === object ? function (k: string, v: number) {
      return k === '' || -1 < replacer.indexOf(k) ? v : void 0;
    } : replacer || noop;
    var known: Map = new Map();
    var input: any[] = [];
    var output: any[] = [];
    var i: number = +set(known, input, $.call({
      '': value
    }, '', value));
    var firstRun: boolean = !i;

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

      var after: string = $.call(this, key, value);

      switch (_typeof(after)) {
        case object:
          if (after === null) return after;

        case primitive:
          return known.get(after) || set(known, input, after);
      }

      return after;
    }
  };
  var toJSON: Function = function toJSON(any: any[]): Promise {
    return $parse(stringify(any));
  };
  var fromJSON: object = function fromJSON(any: any[]): Promise {
    return parse($stringify(any));
  };

  exports.fromJSON = fromJSON;
  exports.parse = parse;
  exports.stringify = stringify;
  exports.toJSON = toJSON;

  return exports;

})({});
