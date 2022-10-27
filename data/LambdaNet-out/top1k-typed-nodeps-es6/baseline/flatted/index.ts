self.Flatted = (function (exports: Object) {
  'use strict';

  function _typeof(obj: String): Boolean {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj: String) {
      return typeof obj;
    } : function (obj: Object) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  /*! (c) 2020 Andrea Giammarchi */
  var $parse: Function = JSON.parse,
      $stringify: Object = JSON.stringify;
  var keys: Function = Object.keys;
  var Primitive: String = String; // it could be Number

  var primitive: String = 'string'; // it could be 'number'

  var ignore: Function = {};
  var object: String = 'object';

  var noop: Function = function noop(_: String, value: String): String {
    return value;
  };

  var primitives: Function = function primitives(value: String): String {
    return value instanceof Primitive ? Primitive(value) : value;
  };

  var Primitives: Function = function Primitives(_: String, value: String): String {
    return _typeof(value) === primitive ? new Primitive(value) : value;
  };

  var revive: Function = function revive(input: Object, parsed: Object, output: Object, $: Function): Object {
    var lazy: Array = [];

    for (var ke = keys(output), length = ke.length, y = 0; y < length; y++) {
      var k: String = ke[y];
      var value: String = output[k];

      if (value instanceof Primitive) {
        var tmp: String = input[value];

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
      var _lazy$i: Object = lazy[i],
          _k: Array = _lazy$i.k,
          a: Array = _lazy$i.a;
      output[_k] = $.call(output, _k, revive.apply(null, a));
    }

    return output;
  };

  var set: Function = function set(known: Map, input: Array, value: String): String {
    var index: String = Primitive(input.push(value) - 1);
    known.set(value, index);
    return index;
  };

  var parse: Function = function parse(text: String, reviver: String): String {
    var input: Object = $parse(text, Primitives).map(primitives);
    var value: String = input[0];
    var $: Function = reviver || noop;
    var tmp: String = _typeof(value) === object && value ? revive(input, new Set(), value, $) : value;
    return $.call({
      '': tmp
    }, '', tmp);
  };
  var stringify: Function = function stringify(value: String, replacer: String, space: Function): String {
    var $: Function = replacer && _typeof(replacer) === object ? function (k: String, v: Number) {
      return k === '' || -1 < replacer.indexOf(k) ? v : void 0;
    } : replacer || noop;
    var known: Map = new Map();
    var input: Array = [];
    var output: Array = [];
    var i: Number = +set(known, input, $.call({
      '': value
    }, '', value));
    var firstRun: Boolean = !i;

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

      var after: String = $.call(this, key, value);

      switch (_typeof(after)) {
        case object:
          if (after === null) return after;

        case primitive:
          return known.get(after) || set(known, input, after);
      }

      return after;
    }
  };
  var toJSON: Function = function toJSON(any: Array): Promise {
    return $parse(stringify(any));
  };
  var fromJSON: Object = function fromJSON(any: Array): Promise {
    return parse($stringify(any));
  };

  exports.fromJSON = fromJSON;
  exports.parse = parse;
  exports.stringify = stringify;
  exports.toJSON = toJSON;

  return exports;

})({});
