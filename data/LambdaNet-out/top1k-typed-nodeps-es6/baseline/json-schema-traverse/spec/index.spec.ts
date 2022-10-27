'use strict';

import traverse from '../index';
import assert from 'assert';

describe('json-schema-traverse', function() {
  var calls: Array;

  beforeEach(function() {
    calls = [];
  });

  it('should traverse all keywords containing schemas recursively', function() {
    var schema: Array = require('./fixtures/schema').schema;
    var expectedCalls: Array = require('./fixtures/schema').expectedCalls;

    traverse(schema, {cb: callback});
    assert.deepStrictEqual(calls, expectedCalls);
  });

  describe('Legacy v0.3.1 API', function() {
    it('should traverse all keywords containing schemas recursively', function() {
      var schema: Array = require('./fixtures/schema').schema;
      var expectedCalls: Array = require('./fixtures/schema').expectedCalls;

      traverse(schema, callback);
      assert.deepStrictEqual(calls, expectedCalls);
    });

    it('should work when an options object is provided', function() {
      // schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex
      var schema: Array = require('./fixtures/schema').schema;
      var expectedCalls: Array = require('./fixtures/schema').expectedCalls;

      traverse(schema, {}, callback);
      assert.deepStrictEqual(calls, expectedCalls);
    });
  });


  describe('allKeys option', function() {
    var schema: Object = {
      someObject: {
        minimum: 1,
        maximum: 2
      }
    };

    it('should traverse objects with allKeys: true option', function() {
      // schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex
      var expectedCalls: Array = [
        [schema, '', schema, undefined, undefined, undefined, undefined],
        [schema.someObject, '/someObject', schema, '', 'someObject', schema, undefined]
      ];

      traverse(schema, {allKeys: true, cb: callback});
      assert.deepStrictEqual(calls, expectedCalls);
    });


    it('should NOT traverse objects with allKeys: false option', function() {
      // schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex
      var expectedCalls: Array = [
        [schema, '', schema, undefined, undefined, undefined, undefined]
      ];

      traverse(schema, {allKeys: false, cb: callback});
      assert.deepStrictEqual(calls, expectedCalls);
    });


    it('should NOT traverse objects without allKeys option', function() {
      // schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex
      var expectedCalls: Array = [
        [schema, '', schema, undefined, undefined, undefined, undefined]
      ];

      traverse(schema, {cb: callback});
      assert.deepStrictEqual(calls, expectedCalls);
    });


    it('should NOT travers objects in standard keywords which value is not a schema', function() {
      var schema2: Object = {
        const: {foo: 'bar'},
        enum: ['a', 'b'],
        required: ['foo'],
        another: {

        },
        patternProperties: {}, // will not traverse - no properties
        dependencies: true, // will not traverse - invalid
        properties: {
          smaller: {
            type: 'number'
          },
          larger: {
            type: 'number',
            minimum: {$data: '1/smaller'}
          }
        }
      };

      // schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex
      var expectedCalls: Array = [
        [schema2, '', schema2, undefined, undefined, undefined, undefined],
        [schema2.another, '/another', schema2, '', 'another', schema2, undefined],
        [schema2.properties.smaller, '/properties/smaller', schema2, '', 'properties', schema2, 'smaller'],
        [schema2.properties.larger, '/properties/larger', schema2, '', 'properties', schema2, 'larger'],
      ];

      traverse(schema2, {allKeys: true, cb: callback});
      assert.deepStrictEqual(calls, expectedCalls);
    });
  });

  describe('pre and post', function() {
    var schema: Object = {
      type: 'object',
      properties: {
        name: {type: 'string'},
        age: {type: 'number'}
      }
    };

    it('should traverse schema in pre-order', function() {
      traverse(schema, {cb: {pre}});
      var expectedCalls: Array = [
        ['pre', schema, '', schema, undefined, undefined, undefined, undefined],
        ['pre', schema.properties.name, '/properties/name', schema, '', 'properties', schema, 'name'],
        ['pre', schema.properties.age, '/properties/age', schema, '', 'properties', schema, 'age'],
      ];
      assert.deepStrictEqual(calls, expectedCalls);
    });

    it('should traverse schema in post-order', function() {
      traverse(schema, {cb: {post}});
      var expectedCalls: Array = [
        ['post', schema.properties.name, '/properties/name', schema, '', 'properties', schema, 'name'],
        ['post', schema.properties.age, '/properties/age', schema, '', 'properties', schema, 'age'],
        ['post', schema, '', schema, undefined, undefined, undefined, undefined],
      ];
      assert.deepStrictEqual(calls, expectedCalls);
    });

    it('should traverse schema in pre- and post-order at the same time', function() {
      traverse(schema, {cb: {pre, post}});
      var expectedCalls: Array = [
        ['pre', schema, '', schema, undefined, undefined, undefined, undefined],
        ['pre', schema.properties.name, '/properties/name', schema, '', 'properties', schema, 'name'],
        ['post', schema.properties.name, '/properties/name', schema, '', 'properties', schema, 'name'],
        ['pre', schema.properties.age, '/properties/age', schema, '', 'properties', schema, 'age'],
        ['post', schema.properties.age, '/properties/age', schema, '', 'properties', schema, 'age'],
        ['post', schema, '', schema, undefined, undefined, undefined, undefined],
      ];
      assert.deepStrictEqual(calls, expectedCalls);
    });
  });

  function callback(): Void {
    calls.push(Array.prototype.slice.call(arguments));
  }

  function pre(): Void {
    calls.push(['pre'].concat(Array.prototype.slice.call(arguments)));
  }

  function post(): Void {
    calls.push(['post'].concat(Array.prototype.slice.call(arguments)));
  }
});
