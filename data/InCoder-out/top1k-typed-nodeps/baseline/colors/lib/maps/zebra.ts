module['exports'] = function(colors: Array<string>) {
  return function(letter: number,  i: number,  exploded: number[]) {
    return i % 2 === 0 ? letter : colors.inverse(letter);
  };
};