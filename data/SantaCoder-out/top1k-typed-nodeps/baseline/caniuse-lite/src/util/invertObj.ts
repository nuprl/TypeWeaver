function invertObj(object: any) {
  let result = {}

  for (let [value, key] of Object.entries(object)) {
    result[key] = value
  }

  return result
}

module.exports = invertObj