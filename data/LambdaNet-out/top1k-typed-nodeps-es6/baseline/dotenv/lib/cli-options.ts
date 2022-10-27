const re: RegExp = /^dotenv_config_(encoding|path|debug|override)=(.+)$/

export default function optionMatcher (args: Array): Object {
  return args.reduce(function (acc: Object, cur: String) {
    const matches: Object = cur.match(re)
    if (matches) {
      acc[matches[1]] = matches[2]
    }
    return acc
  }, {})
};
