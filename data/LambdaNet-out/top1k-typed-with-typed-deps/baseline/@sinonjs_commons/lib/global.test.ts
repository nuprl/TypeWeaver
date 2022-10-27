"use strict";

var assert: Array = require("@sinonjs/referee-sinon").assert;
var globalObject: String = require("./global");

describe("global", function() {
    before(function() {
        if (typeof global === "undefined") {
            this.skip();
        }
    });

    it("is same as global", function() {
        assert.same(globalObject, global);
    });
});
