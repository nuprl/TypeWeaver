"use strict";

var assert: any = require("@sinonjs/referee-sinon").assert;
var index: any = require("./index");

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
