"use strict";

var call: Function = Function.call;

module.exports = function copyPrototypeMethods(prototype: Object): Array {
    // eslint-disable-next-line @sinonjs/no-prototype-methods/no-prototype-methods
    return Object.getOwnPropertyNames(prototype).reduce(function(result: Object, name: String) {
        // ignore size because it throws from Map
        if (
            name !== "size" &&
            name !== "caller" &&
            name !== "callee" &&
            name !== "arguments" &&
            typeof prototype[name] === "function"
        ) {
            result[name] = call.bind(prototype[name]);
        }

        return result;
    }, Object.create(null));
};
