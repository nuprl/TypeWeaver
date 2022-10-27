"use strict";
/* eslint-disable no-empty-function */

var assert: any = require("@sinonjs/referee").assert;
var className: any = require("./class-name");

describe("className", function() {
    it("returns the class name of an instance", function() {
        // Because eslint-config-sinon disables es6, we can't
        // use a class definition here
        // https://github.com/sinonjs/eslint-config-sinon/blob/master/index.js
        // var instance = new (class TestClass {})();
        var instance: any = new (function TestClass(): void {})();
        var name: string = className(instance);
        assert.equals(name, "TestClass");
    });

    it("returns 'Object' for {}", function() {
        var name: string = className({});
        assert.equals(name, "Object");
    });

    it("returns null for an object that has no prototype", function() {
        var obj: any = Object.create(null);
        var name: string = className(obj);
        assert.equals(name, null);
    });

    it("returns null for an object whose prototype was mangled", function() {
        // This is what Node v6 and v7 do for objects returned by querystring.parse()
        function MangledObject(): void {}
        MangledObject.prototype = Object.create(null);
        var obj: any = new MangledObject();
        var name: string = className(obj);
        assert.equals(name, null);
    });
});
