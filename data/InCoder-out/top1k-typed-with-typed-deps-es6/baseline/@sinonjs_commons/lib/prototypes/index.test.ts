"use strict";

import { assert } from '@sinonjs/referee-sinon';
import { array as arrayProto } from './index';
import { function as functionProto } from './index';
import { map as mapProto } from './index';
import { object as objectProto } from './index';
import { set as setProto } from './index';
import { string as stringProto } from './index';

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

function verifyProperties(p: PropertyDescriptor,  origin: PropertyDescriptor) {
    it("should have all the methods of the origin prototype", function() {
        var methodNames = Object.getOwnPropertyNames(origin.prototype).filter(
            function(name: any) {
                return (
                    name !== "size" &&
                    name !== "caller" &&
                    name !== "callee" &&
                    name !== "arguments" &&
                    typeof origin.prototype[name] === "function"
                );
            }
        );

        methodNames.forEach(function(name: any) {
            assert.isTrue(Object.prototype.hasOwnProperty.call(p, name), name);
        });
    });
}