export default Long;
/**
 * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
 *  See the from* functions below for more convenient ways of constructing Longs.
 * @exports Long
 * @class A Long class for representing a 64 bit two's-complement integer value.
 * @param {number} low The low (signed) 32 bits of the long
 * @param {number} high The high (signed) 32 bits of the long
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @constructor
 */
declare function Long(low: number, high: number, unsigned?: boolean | undefined): void;
declare class Long {
    /**
     * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
     *  See the from* functions below for more convenient ways of constructing Longs.
     * @exports Long
     * @class A Long class for representing a 64 bit two's-complement integer value.
     * @param {number} low The low (signed) 32 bits of the long
     * @param {number} high The high (signed) 32 bits of the long
     * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
     * @constructor
     */
    constructor(low: number, high: number, unsigned?: boolean | undefined);
    /**
     * The low 32 bits as a signed value.
     * @type {number}
     */
    low: number;
    /**
     * The high 32 bits as a signed value.
     * @type {number}
     */
    high: number;
    /**
     * Whether unsigned or not.
     * @type {boolean}
     */
    unsigned: boolean;
    /**
     * An indicator used to reliably determine if an object is a Long or not.
     * @type {boolean}
     * @const
     * @private
     */
    private readonly __isLong__;
}
declare namespace Long {
    export { isLong };
    export { fromInt };
    export { fromNumber };
    export { fromBits };
    export { fromString };
    export { fromValue };
    export { ZERO };
    export { UZERO };
    export { ONE };
    export { UONE };
    export { NEG_ONE };
    export { MAX_VALUE };
    export { MAX_UNSIGNED_VALUE };
    export { MIN_VALUE };
    /**
     * Creates a Long from its byte representation.
     * @param {!Array.<number>} bytes Byte representation
     * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
     * @param {boolean=} le Whether little or big endian, defaults to big endian
     * @returns {Long} The corresponding Long value
     */
    export function fromBytes(bytes: number[], unsigned?: boolean, le?: boolean): Long;
    /**
     * Creates a Long from its little endian byte representation.
     * @param {!Array.<number>} bytes Little endian byte representation
     * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
     * @returns {Long} The corresponding Long value
     */
    export function fromBytesLE(bytes: number[], unsigned?: boolean): Long;
    /**
     * Creates a Long from its big endian byte representation.
     * @param {!Array.<number>} bytes Big endian byte representation
     * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
     * @returns {Long} The corresponding Long value
     */
    export function fromBytesBE(bytes: number[], unsigned?: boolean): Long;
}
/**
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 * @inner
 */
declare function isLong(obj: any): boolean;
/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
declare function fromInt(value: number, unsigned?: boolean | undefined): Long;
/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
declare function fromNumber(value: number, unsigned?: boolean | undefined): Long;
/**
 * @param {number} lowBits
 * @param {number} highBits
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
declare function fromBits(lowBits: number, highBits: number, unsigned?: boolean | undefined): Long;
/**
 * @param {string} str
 * @param {(boolean|number)=} unsigned
 * @param {number=} radix
 * @returns {!Long}
 * @inner
 */
declare function fromString(str: string, unsigned?: (boolean | number) | undefined, radix?: number | undefined): Long;
/**
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
declare function fromValue(val: Long | number | string | {
    low: number;
    high: number;
    unsigned: boolean;
}, unsigned?: boolean | undefined): Long;
/**
 * @type {!Long}
 * @inner
 */
declare var ZERO: Long;
/**
 * @type {!Long}
 * @inner
 */
declare var UZERO: Long;
/**
 * @type {!Long}
 * @inner
 */
declare var ONE: Long;
/**
 * @type {!Long}
 * @inner
 */
declare var UONE: Long;
/**
 * @type {!Long}
 * @inner
 */
declare var NEG_ONE: Long;
/**
 * @type {!Long}
 * @inner
 */
declare var MAX_VALUE: Long;
/**
 * @type {!Long}
 * @inner
 */
declare var MAX_UNSIGNED_VALUE: Long;
/**
 * @type {!Long}
 * @inner
 */
declare var MIN_VALUE: Long;
