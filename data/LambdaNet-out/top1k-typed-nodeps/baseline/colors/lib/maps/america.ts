module['exports'] = function(colors: object) {
  return function(letter: string, i: number, exploded: Function) {
    if (letter === ' ') return letter;
    switch (i%3) {
      case 0: return colors.red(letter);
      case 1: return colors.white(letter);
      case 2: return colors.blue(letter);
    }
  };
};
