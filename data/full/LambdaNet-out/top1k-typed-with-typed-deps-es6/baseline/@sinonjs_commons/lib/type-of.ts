"use strict";

import type from 'type-detect';

/**
 * Returns the lower-case result of running type from type-detect on the value
 *
 * @param  {*} value
 * @returns {string}
 */
export default function typeOf(value: string): string {
    return type(value).toLowerCase();
};
