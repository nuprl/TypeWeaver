module['exports'] = function(colors: string[]) {
  return function(letter: letter,  i: i,  exploded: exploded) {
    return i % 2 === 0 ? letter : colors.inverse(letter);
  };
};