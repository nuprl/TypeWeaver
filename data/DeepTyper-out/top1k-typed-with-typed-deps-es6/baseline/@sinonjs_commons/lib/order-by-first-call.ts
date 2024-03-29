"use strict";

import { sort } from './prototypes/array';
import { slice } from './prototypes/array';

/**
 * @private
 */
function comparator(a: any, b: string): boolean {
    // uuid, won't ever be equal
    var aCall: number = a.getCall(0);
    var bCall: number = b.getCall(0);
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
function orderByFirstCall(spies: any): string {
    return sort(slice(spies), comparator);
}

export default orderByFirstCall;
