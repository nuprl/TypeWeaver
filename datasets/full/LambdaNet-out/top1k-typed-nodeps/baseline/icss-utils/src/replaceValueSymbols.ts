const matchValueName: RegExp = /[$]?[\w-]+/g;

const replaceValueSymbols: Function = (value: string, replacements: object) => {
  let matches: object;

  while ((matches = matchValueName.exec(value))) {
    const replacement: string = replacements[matches[0]];

    if (replacement) {
      value =
        value.slice(0, matches.index) +
        replacement +
        value.slice(matchValueName.lastIndex);

      matchValueName.lastIndex -= matches[0].length - replacement.length;
    }
  }

  return value;
};

module.exports = replaceValueSymbols;
