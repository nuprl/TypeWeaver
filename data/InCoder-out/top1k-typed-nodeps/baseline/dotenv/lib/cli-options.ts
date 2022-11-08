const re = /^dotenv_config_(encoding|path|debug|override)=(.+)$/

module.exports = function optionMatcher (args: any[]) {
  return args.reduce(function (acc: any,  cur: RegExp) {
    const matches = cur.match(re)
    if (matches) {
      acc[matches[1]] = matches[2]
    }
    return acc
  }, {})
}