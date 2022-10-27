const matchValueName: RegExp = /[$]?[\w-]+/g;

const replaceValueSymbols: Function = (value: String, replacements: Object) => {
  let matches: Object;

  while ((matches = matchValueName.exec(value))) {
    const replacement: String = replacements[matches[0]];

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
