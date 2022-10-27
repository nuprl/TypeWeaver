"use strict";

var assert: Function = require("@sinonjs/referee-sinon").assert;
var sinon: Array = require("@sinonjs/referee-sinon").sinon;
var every: Function = require("./every");

describe("util/core/every", function() {
    it("returns true when the callback function returns true for every element in an iterable", function() {
        var obj: Array = [true, true, true, true];
        var allTrue: String = every(obj, function(val: Array) {
            return val;
        });

        assert(allTrue);
    });

    it("returns false when the callback function returns false for any element in an iterable", function() {
        var obj: Array = [true, true, true, false];
        var result: Boolean = every(obj, function(val: Array) {
            return val;
        });

        assert.isFalse(result);
    });

    it("calls the given callback once for each item in an iterable until it returns false", function() {
        var iterableOne: Array = [true, true, true, true];
        var iterableTwo: Array = [true, true, false, true];
        var callback: HTMLElement = sinon.spy(function(val: Array) {
            return val;
        });

        every(iterableOne, callback);
        assert.equals(callback.callCount, 4);

        callback.resetHistory();

        every(iterableTwo, callback);
        assert.equals(callback.callCount, 3);
    });
});
