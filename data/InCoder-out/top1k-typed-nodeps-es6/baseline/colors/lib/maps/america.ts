module['exports'] = function(colors: Array<string>) {
  return function(letter: number,  i: number,  exploded: number[]) {
    if (letter === ' ') return letter;
    switch (i%3) {
      case 0: return colors.red(letter);
      case 1: return colors.white(letter);
      case 2: return colors.blue(letter);
    }
  };
};