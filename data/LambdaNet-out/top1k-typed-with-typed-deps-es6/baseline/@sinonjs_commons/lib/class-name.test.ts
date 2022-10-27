"use strict";

/* eslint-disable no-empty-function */

import { assert } from '@sinonjs/referee';

import className from './class-name';

describe("className", function() {
    it("returns the class name of an instance", function() {
        // Because eslint-config-sinon disables es6, we can't
        // use a class definition here
        // https://github.com/sinonjs/eslint-config-sinon/blob/master/index.js
        // var instance = new (class TestClass {})();
        var instance: String = new (function TestClass(): Void {})();
        var name: String = className(instance);
        assert.equals(name, "TestClass");
    });

    it("returns 'Object' for {}", function() {
        var name: String = className({});
        assert.equals(name, "Object");
    });

    it("returns null for an object that has no prototype", function() {
        var obj: Object = Object.create(null);
        var name: String = className(obj);
        assert.equals(name, null);
    });

    it("returns null for an object whose prototype was mangled", function() {
        // This is what Node v6 and v7 do for objects returned by querystring.parse()
        function MangledObject(): Void {}
        MangledObject.prototype = Object.create(null);
        var obj: String = new MangledObject();
        var name: String = className(obj);
        assert.equals(name, null);
    });
});
