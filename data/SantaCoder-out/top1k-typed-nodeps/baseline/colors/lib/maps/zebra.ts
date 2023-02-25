module['exports'] = function(colors: string[]) {
  return function(letter: string, i: number, exploded: string[]) {
    return i % 2 === 0 ? letter : colors.inverse(letter);
  };
};