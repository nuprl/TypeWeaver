self.Flatted = (function (exports: any) {
  'use strict';

  function _typeof(obj: any): any {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj: any) {
      return typeof obj;
    } : function (obj: any) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  /*! (c) 2020 Andrea Giammarchi */
  var $parse = JSON.parse,
      $stringify = JSON.stringify;
  var keys: string[] = Object.keys;
  var Primitive: string = String; // it could be Number

  var primitive: string = 'string'; // it could be 'number'

  var ignore: {} = {};
  var object: string = 'object';

  var noop: void = function noop(_: any, value: any): void {
    return value;
  };

  var primitives: any = function primitives(value: any): any {
    return value instanceof Primitive ? Primitive(value) : value;
  };

  var Primitives: any = function Primitives(_: any, value: any): string {
    return _typeof(value) === primitive ? new Primitive(value) : value;
  };

  var revive: any = function revive(input: any, parsed: any, output: any, $): any[] {
    var lazy: any[] = [];

    for (var ke = keys(output), length = ke.length, y = 0; y < length; y++) {
      var k: any = ke[y];
      var value: any = output[k];

      if (value instanceof Primitive) {
        var tmp: any = input[value];

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
      var _lazy$i = lazy[i],
          _k = _lazy$i.k,
          a = _lazy$i.a;
      output[_k] = $.call(output, _k, revive.apply(null, a));
    }

    return output;
  };

  var set = function set(known: any, input: any, value: any) {
    var index: any = Primitive(input.push(value) - 1);
    known.set(value, index);
    return index;
  };

  var parse: any = function parse(text: any, reviver: any): any {
    var input: any = $parse(text, Primitives).map(primitives);
    var value: any = input[0];
    var $ = reviver || noop;
    var tmp: any = _typeof(value) === object && value ? revive(input, new Set(), value, $) : value;
    return $.call({
      '': tmp
    }, '', tmp);
  };
  var stringify: string = function stringify(value: any, replacer: any, space: any): string {
    var $ = replacer && _typeof(replacer) === object ? function (k: string, v: any) {
      return k === '' || -1 < replacer.indexOf(k) ? v : void 0;
    } : replacer || noop;
    var known: any = new Map();
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

    function replace(key: string, value: any): any {
      if (firstRun) {
        firstRun = !firstRun;
        return value;
      }

      var after: any = $.call(this, key, value);

      switch (_typeof(after)) {
        case object:
          if (after === null) return after;

        case primitive:
          return known.get(after) || set(known, input, after);
      }

      return after;
    }
  };
  var toJSON: any = function toJSON(any): any {
    return $parse(stringify(any));
  };
  var fromJSON: any = function fromJSON(any): any {
    return parse($stringify(any));
  };

  exports.fromJSON = fromJSON;
  exports.parse = parse;
  exports.stringify = stringify;
  exports.toJSON = toJSON;

  return exports;

})({});
