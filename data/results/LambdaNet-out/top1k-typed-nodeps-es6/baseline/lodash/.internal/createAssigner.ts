import isIterateeCall from './isIterateeCall.js'

/**
 * Creates a function like `assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner: Function): Function {
  return (object: number, ...sources) => {
    let index: number = -1
    let length: number = sources.length
    let customizer: string = length > 1 ? sources[length - 1] : undefined
    const guard: string = length > 2 ? sources[2] : undefined

    customizer = (assigner.length > 3 && typeof customizer === 'function')
      ? (length--, customizer)
      : undefined

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer
      length = 1
    }
    object = Object(object)
    while (++index < length) {
      const source: string = sources[index]
      if (source) {
        assigner(object, source, index, customizer)
      }
    }
    return object
  }
}

export default createAssigner
