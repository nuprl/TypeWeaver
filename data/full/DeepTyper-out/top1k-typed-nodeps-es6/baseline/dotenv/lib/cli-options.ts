const re: RegExp = /^dotenv_config_(encoding|path|debug|override)=(.+)$/

export default function optionMatcher (args: any): boolean {
  return args.reduce(function (acc: any, cur: string) {
    const matches: RegExpMatchArray = cur.match(re)
    if (matches) {
      acc[matches[1]] = matches[2]
    }
    return acc
  }, {})
};
