module['exports'] = function(colors: object) {
  return function(letter: string, i: number, exploded: Function) {
    return i % 2 === 0 ? letter : colors.inverse(letter);
  };
};
