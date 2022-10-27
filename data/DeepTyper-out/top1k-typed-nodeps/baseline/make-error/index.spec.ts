"use strict";

/* eslint-env jest */

// ===================================================================

var makeError: any = require("./");
var BaseError: any = makeError.BaseError;

// ===================================================================

function getCommonLastItems(arr1: string, arr2: string, butFirsts: string): any {
  var n: number = Math.min(arr1.length, arr2.length) - (butFirsts || 0);

  return [arr1.slice(-n), arr2.slice(-n)];
}

function compareStacks(actual: string, expected: string): void {
  actual = actual.split(/\r?\n/);
  expected = expected.split(/\r?\n/);

  // We want to compare only the beginning (bottom) of the stack and
  // we don't want to compare the first (from head) two items.
  var tmp: any = getCommonLastItems(actual, expected, 2);
  actual = tmp[0];
  expected = tmp[1];

  expect(actual).toEqual(expected);
}

function randomString(): string {
  return Math.random().toString(36).slice(2);
}

// ===================================================================

var factories: any = {
  "makeError(name)": makeError,
  "makeError(constructor)": function (name: string, super_: any) {
    function MyError(message: string): void {
      MyError.super.call(this, message);
    }
    Object.defineProperty(MyError, "name", { value: name });

    expect(makeError(MyError, super_)).toBe(MyError);
    return MyError;
  },
  "ES3 inheritance": function (name: any, super_: any) {
    function MyError(message: string): void {
      BaseError.call(this, message);
    }
    Object.defineProperty(MyError, "name", {
      value: name,
    });

    function Tmp(): void {
      this.constructor = MyError;
    }
    Tmp.prototype = super_.prototype;
    MyError.prototype = new Tmp();

    return MyError;
  },
  "ES5 inheritance": function (name: any, super_: any) {
    function MyError(message: string): void {
      super_.call(this, message);
    }
    Object.defineProperty(MyError, "name", {
      value: name,
    });

    // Manually inherits from BaseError.
    MyError.prototype = Object.create(super_.prototype, {
      constructor: {
        configurable: true,
        value: MyError,
        writable: true,
      },
    });

    return MyError;
  },
  "ES6 inheritance":
    typeof Reflect !== "undefined" &&
    function (name: string, super_: any) {
      /* eslint-disable-next-line no-eval */
      return Object.defineProperty(eval("(class extends super_ {})"), "name", {
        value: name,
      });
    },
};

var keys: string[] = Object.keys(factories);

it("makeError throws on invalid arguments", function () {
  expect(function () {
    makeError(42);
  }).toThrow(TypeError);
  expect(function () {
    makeError("MyError", 42);
  }).toThrow(TypeError);
});

keys.forEach(function (title: string) {
  var factory: any = factories[title];
  (factory ? describe : describe.skip)(title, function () {
    it("creates a new error class", function () {
      var name: string = randomString();
      var MyError: any = factory(name, BaseError);

      var message: string = randomString();
      var e: any = new MyError(message);
      var stack: any = new Error().stack;

      expect(e).toBeInstanceOf(Error);
      expect(e).toBeInstanceOf(BaseError);
      expect(e).toBeInstanceOf(MyError);

      expect(e.name).toBe(name);
      expect(e.message).toBe(message);
      expect(typeof e.stack).toBe("string");
      compareStacks(e.stack, stack);
    });

    describe("derivable with", function () {
      keys.forEach(function (title2: any) {
        var factory2: any = factories[title2];

        // these use cases are known not to be working, mark them as skipped
        if (
          (title === "makeError(name)" &&
            (title2 === "makeError(constructor)" ||
              title2 === "ES5 inheritance")) ||
          (title === "ES6 inheritance" &&
            (title2 === "makeError(constructor)" ||
              title2 === "ES5 inheritance"))
        ) {
          factory2 = undefined;
        }

        (factory2 ? it : it.skip)(title2, function () {
          var baseName: string = randomString();
          var MyBaseError: any = factory(baseName, BaseError);
          var derivedName: string = randomString();
          var MyDerivedError: any = factory2(derivedName, MyBaseError);

          var message: string = randomString();
          var e: any = new MyDerivedError(message);
          var stack: Error = new Error().stack;

          expect(e).toBeInstanceOf(Error);
          expect(e).toBeInstanceOf(BaseError);
          expect(e).toBeInstanceOf(MyBaseError);
          expect(e).toBeInstanceOf(MyDerivedError);

          expect(e.name).toBe(derivedName);
          expect(e.message).toBe(message);
          expect(typeof e.stack).toBe("string");
          compareStacks(e.stack, stack);
        });
      });
    });
  });
});
