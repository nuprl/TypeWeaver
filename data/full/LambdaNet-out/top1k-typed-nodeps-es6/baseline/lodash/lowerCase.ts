import words from './words.js'
import toString from './toString.js'

const reQuotes: RegExp = /['\u2019]/g

/**
 * Converts `string`, as space separated words, to lower case.
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the lower cased string.
 * @see camelCase, kebabCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * lowerCase('--Foo-Bar--')
 * // => 'foo bar'
 *
 * lowerCase('fooBar')
 * // => 'foo bar'
 *
 * lowerCase('__FOO_BAR__')
 * // => 'foo bar'
 */
const lowerCase: Function = (string: string) => (
  words(toString(string).replace(reQuotes, '')).reduce((result: number, word: string, index: boolean) => (
    result + (index ? ' ' : '') + word.toLowerCase()
  ), '')
)

export default lowerCase
