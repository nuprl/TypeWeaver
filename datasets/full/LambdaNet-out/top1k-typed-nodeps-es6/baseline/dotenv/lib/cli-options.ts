const re: RegExp = /^dotenv_config_(encoding|path|debug|override)=(.+)$/

export default function optionMatcher (args: any[]): object {
  return args.reduce(function (acc: object, cur: string) {
    const matches: object = cur.match(re)
    if (matches) {
      acc[matches[1]] = matches[2]
    }
    return acc
  }, {})
};
