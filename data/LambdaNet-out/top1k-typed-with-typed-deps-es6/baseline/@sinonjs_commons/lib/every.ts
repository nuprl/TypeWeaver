"use strict";

/**
 * Returns true when fn returns true for all members of obj.
 * This is an every implementation that works for all iterables
 *
 * @param  {object}   obj
 * @param  {Function} fn
 * @returns {boolean}
 */
export default function every(obj: any[], fn: Function): boolean {
    var pass: boolean = true;

    try {
        // eslint-disable-next-line @sinonjs/no-prototype-methods/no-prototype-methods
        obj.forEach(function() {
            if (!fn.apply(this, arguments)) {
                // Throwing an error is the only way to break `forEach`
                throw new Error();
            }
        });
    } catch (e) {
        pass = false;
    }

    return pass;
};
