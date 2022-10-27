const re: RegExp = /^dotenv_config_(encoding|path|debug|override)=(.+)$/

module.exports = function optionMatcher (args: Array): Array {
  return args.reduce(function (acc: Object, cur: String) {
    const matches: Object = cur.match(re)
    if (matches) {
      acc[matches[1]] = matches[2]
    }
    return acc
  }, {})
}
