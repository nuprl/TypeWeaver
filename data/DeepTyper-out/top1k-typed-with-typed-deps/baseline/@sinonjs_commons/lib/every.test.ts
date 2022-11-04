"use strict";

var assert: any = require("@sinonjs/referee-sinon").assert;
var sinon: any = require("@sinonjs/referee-sinon").sinon;
var every: any = require("./every");

describe("util/core/every", function() {
    it("returns true when the callback function returns true for every element in an iterable", function() {
        var obj: boolean = [true, true, true, true];
        var allTrue: boolean = every(obj, function(val: any) {
            return val;
        });

        assert(allTrue);
    });

    it("returns false when the callback function returns false for any element in an iterable", function() {
        var obj: boolean = [true, true, true, false];
        var result: boolean = every(obj, function(val: any) {
            return val;
        });

        assert.isFalse(result);
    });

    it("calls the given callback once for each item in an iterable until it returns false", function() {
        var iterableOne: any[] = [true, true, true, true];
        var iterableTwo: any[] = [true, true, false, true];
        var callback: any = sinon.spy(function(val: any) {
            return val;
        });

        every(iterableOne, callback);
        assert.equals(callback.callCount, 4);

        callback.resetHistory();

        every(iterableTwo, callback);
        assert.equals(callback.callCount, 3);
    });
});