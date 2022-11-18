import words from './words.js'
import toString from './toString.js'

/**
 * Converts `string` to
 * [snake case](https://en.wikipedia.org/wiki/Snake_case).
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the snake cased string.
 * @see camelCase, lowerCase, kebabCase, startCase, upperCase, upperFirst
 * @example
 *
 * snakeCase('Foo Bar')
 * // => 'foo_bar'
 *
 * snakeCase('fooBar')
 * // => 'foo_bar'
 *
 * snakeCase('--FOO-BAR--')
 * // => 'foo_bar'
 *
 * snakeCase('foo2bar')
 * // => 'foo_2_bar'
 */
const snakeCase: Function = (string: string) => (
  words(toString(string).replace(/['\u2019]/g, '')).reduce((result: number, word: string, index: boolean) => (
    result + (index ? '_' : '') + word.toLowerCase()
  ), '')
)

export default snakeCase
