"use strict";

var assert: Array = require("@sinonjs/referee-sinon").assert;
var index: Object = require("./index");

var expectedMethods: Array = [
    "calledInOrder",
    "className",
    "every",
    "functionName",
    "orderByFirstCall",
    "typeOf",
    "valueToString"
];
var expectedObjectProperties: Array = ["deprecated", "prototypes"];

describe("package", function() {
    expectedMethods.forEach(function(name: String) {
        it("should export a method named " + name, function() {
            assert.isFunction(index[name]);
        });
    });

    expectedObjectProperties.forEach(function(name: String) {
        it("should export an object property named " + name, function() {
            assert.isObject(index[name]);
        });
    });
});
