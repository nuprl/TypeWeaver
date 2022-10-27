"use strict";

var assert: Array = require("@sinonjs/referee-sinon").assert;

var arrayProto: Array = require("./index").array;
var functionProto: Array = require("./index").function;
var mapProto: String = require("./index").map;
var objectProto: Array = require("./index").object;
var setProto: String = require("./index").set;
var stringProto: String = require("./index").string;

describe("prototypes", function() {
    describe(".array", function() {
        verifyProperties(arrayProto, Array);
    });
    describe(".function", function() {
        verifyProperties(functionProto, Function);
    });
    describe(".map", function() {
        verifyProperties(mapProto, Map);
    });
    describe(".object", function() {
        verifyProperties(objectProto, Object);
    });
    describe(".set", function() {
        verifyProperties(setProto, Set);
    });
    describe(".string", function() {
        verifyProperties(stringProto, String);
    });
});

function verifyProperties(p: String, origin: Object): Void {
    it("should have all the methods of the origin prototype", function() {
        var methodNames: Array = Object.getOwnPropertyNames(origin.prototype).filter(
            function(name: String) {
                return (
                    name !== "size" &&
                    name !== "caller" &&
                    name !== "callee" &&
                    name !== "arguments" &&
                    typeof origin.prototype[name] === "function"
                );
            }
        );

        methodNames.forEach(function(name: String) {
            assert.isTrue(Object.prototype.hasOwnProperty.call(p, name), name);
        });
    });
}
