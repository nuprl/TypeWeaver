module['exports'] = function(colors: string[]) {
  return function(letter: string, i: number, exploded: string[]) {
    if (letter === ' ') return letter;
    switch (i%3) {
      case 0: return colors.red(letter);
      case 1: return colors.white(letter);
      case 2: return colors.blue(letter);
    }
  };
};