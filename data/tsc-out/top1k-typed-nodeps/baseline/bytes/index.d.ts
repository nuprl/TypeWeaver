export = bytes;
/**
 * Convert the given value in bytes into a string or parse to string to an integer in bytes.
 *
 * @param {string|number} value
 * @param {{
 *  case: [string],
 *  decimalPlaces: [number]
 *  fixedDecimals: [boolean]
 *  thousandsSeparator: [string]
 *  unitSeparator: [string]
 *  }} [options] bytes options.
 *
 * @returns {string|number|null}
 */
declare function bytes(value: string | number, options?: {
    case: [string];
    decimalPlaces: [number];
    fixedDecimals: [boolean];
    thousandsSeparator: [string];
    unitSeparator: [string];
}): string | number | null;
declare namespace bytes {
    export { format, parse };
}
/**
 * Format the given value in bytes into a string.
 *
 * If the value is negative, it is kept as such. If it is a float,
 * it is rounded.
 *
 * @param {number} value
 * @param {object} [options]
 * @param {number} [options.decimalPlaces=2]
 * @param {number} [options.fixedDecimals=false]
 * @param {string} [options.thousandsSeparator=]
 * @param {string} [options.unit=]
 * @param {string} [options.unitSeparator=]
 *
 * @returns {string|null}
 * @public
 */
declare function format(value: number, options?: {
    decimalPlaces?: number;
    fixedDecimals?: number;
    thousandsSeparator?: string;
    unit?: string;
    unitSeparator?: string;
}): string | null;
/**
 * Parse the string value into an integer in bytes.
 *
 * If no unit is given, it is assumed the value is in bytes.
 *
 * @param {number|string} val
 *
 * @returns {number|null}
 * @public
 */
declare function parse(val: number | string): number | null;
