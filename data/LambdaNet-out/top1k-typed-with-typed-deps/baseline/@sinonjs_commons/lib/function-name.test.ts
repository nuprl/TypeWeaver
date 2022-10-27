"use strict";

var jsc: String = require("jsverify");
var refute: Object = require("@sinonjs/referee-sinon").refute;

var functionName: Function = require("./function-name");

describe("function-name", function() {
    it("should return empty string if func is falsy", function() {
        jsc.assertForall("falsy", function(fn: Number) {
            return functionName(fn) === "";
        });
    });

    it("should use displayName by default", function() {
        jsc.assertForall("nestring", function(displayName: String) {
            var fn: Object = { displayName: displayName };

            return functionName(fn) === fn.displayName;
        });
    });

    it("should use name if displayName is not available", function() {
        jsc.assertForall("nestring", function(name: String) {
            var fn: Object = { name: name };

            return functionName(fn) === fn.name;
        });
    });

    it("should fallback to string parsing", function() {
        jsc.assertForall("nat", function(naturalNumber: Number) {
            var name: String = "fn" + naturalNumber;
            var fn: Object = {
                toString: function() {
                    return "\nfunction " + name;
                }
            };

            return functionName(fn) === name;
        });
    });

    it("should not fail when a name cannot be found", function() {
        refute.exception(function() {
            var fn: Object = {
                toString: function() {
                    return "\nfunction (";
                }
            };

            functionName(fn);
        });
    });

    it("should not fail when toString is undefined", function() {
        refute.exception(function() {
            functionName(Object.create(null));
        });
    });

    it("should not fail when toString throws", function() {
        refute.exception(function() {
            var fn: Function;
            try {
                // eslint-disable-next-line no-eval
                fn = eval("(function*() {})")().constructor;
            } catch (e) {
                // env doesn't support generators
                return;
            }

            functionName(fn);
        });
    });
});
