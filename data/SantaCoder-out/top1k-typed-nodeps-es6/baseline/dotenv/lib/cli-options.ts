const re = /^dotenv_config_(encoding|path|debug|override)=(.+)$/

export default function optionMatcher (args: string[]) {
  return args.reduce(function (acc: any, cur: any) {
    const matches = cur.match(re)
    if (matches) {
      acc[matches[1]] = matches[2]
    }
    return acc
  }, {})
};