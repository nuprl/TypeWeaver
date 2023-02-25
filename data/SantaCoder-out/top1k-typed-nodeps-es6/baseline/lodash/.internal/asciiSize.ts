/**
 * Gets the size of an ASCII `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */
function asciiSize({ length }: AsciiSizeInput) {
  return length
}

export default asciiSize