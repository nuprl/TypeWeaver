"use strict";

var sort: any = require("./prototypes/array").sort;
var slice: any = require("./prototypes/array").slice;

/**
 * @private
 */
function comparator(a: any, b: any): boolean {
    // uuid, won't ever be equal
    var aCall: any = a.getCall(0);
    var bCall: any = b.getCall(0);
    var aId: number = (aCall && aCall.callId) || -1;
    var bId: number = (bCall && bCall.callId) || -1;

    return aId < bId ? -1 : 1;
}

/**
 * A Sinon proxy object (fake, spy, stub)
 *
 * @typedef {object} SinonProxy
 * @property {Function} getCall - A method that can return the first call
 */

/**
 * Sorts an array of SinonProxy instances (fake, spy, stub) by their first call
 *
 * @param  {SinonProxy[] | SinonProxy} spies
 * @returns {SinonProxy[]}
 */
function orderByFirstCall(spies: any): any {
    return sort(slice(spies), comparator);
}

module.exports = orderByFirstCall;
