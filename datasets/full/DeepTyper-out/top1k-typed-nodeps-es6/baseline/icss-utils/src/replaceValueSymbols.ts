const matchValueName: RegExp = /[$]?[\w-]+/g;

const replaceValueSymbols: string = (value: string, replacements: RegExp) => {
  let matches: any;

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

export default replaceValueSymbols;
