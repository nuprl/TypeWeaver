"use strict";

import { assert } from '@sinonjs/referee-sinon';
import index from './index';

var expectedMethods: string[] = [
    "calledInOrder",
    "className",
    "every",
    "functionName",
    "orderByFirstCall",
    "typeOf",
    "valueToString"
];
var expectedObjectProperties: string[] = ["deprecated", "prototypes"];

describe("package", function() {
    expectedMethods.forEach(function(name: string) {
        it("should export a method named " + name, function() {
            assert.isFunction(index[name]);
        });
    });

    expectedObjectProperties.forEach(function(name: string) {
        it("should export an object property named " + name, function() {
            assert.isObject(index[name]);
        });
    });
});
