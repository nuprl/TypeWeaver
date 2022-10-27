module['exports'] = function(colors: any) {
  return function(letter: string, i: number, exploded: any) {
    return i % 2 === 0 ? letter : colors.inverse(letter);
  };
};
