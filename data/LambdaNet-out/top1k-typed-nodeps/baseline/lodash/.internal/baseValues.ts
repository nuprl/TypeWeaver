/**
 * The base implementation of `values` and `valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object: object, props: any[]): any[] {
  return props == null ? [] : props.map((key: string) => object[key])
}

export default baseValues
