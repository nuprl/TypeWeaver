module['exports'] = function(colors: object) {
  // RoY G BiV
  var rainbowColors: any[] = ['red', 'yellow', 'green', 'blue', 'magenta'];
  return function(letter: string, i: number, exploded: Function) {
    if (letter === ' ') {
      return letter;
    } else {
      return colors[rainbowColors[i++ % rainbowColors.length]](letter);
    }
  };
};

