"use strict";

var assert: any = require("@sinonjs/referee-sinon").assert;

var arrayProto: any = require("./index").array;
var functionProto: any = require("./index").function;
var mapProto: any = require("./index").map;
var objectProto: any = require("./index").object;
var setProto: any = require("./index").set;
var stringProto: any = require("./index").string;

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

function verifyProperties(p: string, origin: string): void {
    it("should have all the methods of the origin prototype", function() {
        var methodNames: string[] = Object.getOwnPropertyNames(origin.prototype).filter(
            function(name: string) {
                return (
                    name !== "size" &&
                    name !== "caller" &&
                    name !== "callee" &&
                    name !== "arguments" &&
                    typeof origin.prototype[name] === "function"
                );
            }
        );

        methodNames.forEach(function(name: string) {
            assert.isTrue(Object.prototype.hasOwnProperty.call(p, name), name);
        });
    });
}
