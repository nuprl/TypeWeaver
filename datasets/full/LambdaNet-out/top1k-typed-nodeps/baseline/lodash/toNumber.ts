import isObject from './isObject.js'
import isSymbol from './isSymbol.js'

/** Used as references for various `Number` constants. */
const NAN: number = 0 / 0

/** Used to match leading and trailing whitespace. */
const reTrim: RegExp = /^\s+|\s+$/g

/** Used to detect bad signed hexadecimal string values. */
const reIsBadHex: RegExp = /^[-+]0x[0-9a-f]+$/i

/** Used to detect binary string values. */
const reIsBinary: RegExp = /^0b[01]+$/i

/** Used to detect octal string values. */
const reIsOctal: RegExp = /^0o[0-7]+$/i

/** Built-in method references without a dependency on `root`. */
const freeParseInt: any[] = parseInt

/**
 * Converts `value` to a number.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @see isInteger, toInteger, isNumber
 * @example
 *
 * toNumber(3.2)
 * // => 3.2
 *
 * toNumber(Number.MIN_VALUE)
 * // => 5e-324
 *
 * toNumber(Infinity)
 * // => Infinity
 *
 * toNumber('3.2')
 * // => 3.2
 */
function toNumber(value: string): number {
  if (typeof value === 'number') {
    return value
  }
  if (isSymbol(value)) {
    return NAN
  }
  if (isObject(value)) {
    const other: string = typeof value.valueOf === 'function' ? value.valueOf() : value
    value = isObject(other) ? `${other}` : other
  }
  if (typeof value !== 'string') {
    return value === 0 ? value : +value
  }
  value = value.replace(reTrim, '')
  const isBinary: boolean = reIsBinary.test(value)
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value)
}

export default toNumber
