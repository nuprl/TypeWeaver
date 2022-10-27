"use strict";

var assert: any = require("@sinonjs/referee-sinon").assert;
var globalObject: any = require("./global");

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
