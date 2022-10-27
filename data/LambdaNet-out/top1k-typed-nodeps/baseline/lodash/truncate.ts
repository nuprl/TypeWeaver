import baseToString from './.internal/baseToString.js'
import castSlice from './.internal/castSlice.js'
import hasUnicode from './.internal/hasUnicode.js'
import isObject from './isObject.js'
import isRegExp from './isRegExp.js'
import stringSize from './.internal/stringSize.js'
import stringToArray from './.internal/stringToArray.js'
import toString from './toString.js'

/** Used as default options for `truncate`. */
const DEFAULT_TRUNC_LENGTH: Number = 30
const DEFAULT_TRUNC_OMISSION: String = '...'

/** Used to match `RegExp` flags from their coerced string values. */
const reFlags: RegExp = /\w*$/

/**
 * Truncates `string` if it's longer than the given maximum string length.
 * The last characters of the truncated string are replaced with the omission
 * string which defaults to "...".
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to truncate.
 * @param {Object} [options={}] The options object.
 * @param {number} [options.length=30] The maximum string length.
 * @param {string} [options.omission='...'] The string to indicate text is omitted.
 * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
 * @returns {string} Returns the truncated string.
 * @see replace
 * @example
 *
 * truncate('hi-diddly-ho there, neighborino')
 * // => 'hi-diddly-ho there, neighbo...'
 *
 * truncate('hi-diddly-ho there, neighborino', {
 *   'length': 24,
 *   'separator': ' '
 * })
 * // => 'hi-diddly-ho there,...'
 *
 * truncate('hi-diddly-ho there, neighborino', {
 *   'length': 24,
 *   'separator': /,? +/
 * })
 * // => 'hi-diddly-ho there...'
 *
 * truncate('hi-diddly-ho there, neighborino', {
 *   'omission': ' [...]'
 * })
 * // => 'hi-diddly-ho there, neig [...]'
 */
function truncate(string: String, options: Array): String {
  let separator: Stack
  let length: Number = DEFAULT_TRUNC_LENGTH
  let omission: String = DEFAULT_TRUNC_OMISSION

  if (isObject(options)) {
    separator = 'separator' in options ? options.separator : separator
    length = 'length' in options ? options.length : length
    omission = 'omission' in options ? baseToString(options.omission) : omission
  }

  string = toString(string)

  let strSymbols: String
  let strLength: Number = string.length
  if (hasUnicode(string)) {
    strSymbols = stringToArray(string)
    strLength = strSymbols.length
  }
  if (length >= strLength) {
    return string
  }
  let end: Number = length - stringSize(omission)
  if (end < 1) {
    return omission
  }
  let result: String = strSymbols
    ? castSlice(strSymbols, 0, end).join('')
    : string.slice(0, end)

  if (separator === undefined) {
    return result + omission
  }
  if (strSymbols) {
    end += (result.length - end)
  }
  if (isRegExp(separator)) {
    if (string.slice(end).search(separator)) {
      let match: Object
      let newEnd: Number
      const substring: String = result

      if (!separator.global) {
        separator = RegExp(separator.source, `${reFlags.exec(separator) || ''}g`)
      }
      separator.lastIndex = 0
      while ((match = separator.exec(substring))) {
        newEnd = match.index
      }
      result = result.slice(0, newEnd === undefined ? end : newEnd)
    }
  } else if (string.indexOf(baseToString(separator), end) != end) {
    const index: Number = result.lastIndexOf(separator)
    if (index > -1) {
      result = result.slice(0, index)
    }
  }
  return result + omission
}

export default truncate
