module['exports'] = function(colors: any) {
  // RoY G BiV
  var rainbowColors: string[] = ['red', 'yellow', 'green', 'blue', 'magenta'];
  return function(letter: any, i: number, exploded: any) {
    if (letter === ' ') {
      return letter;
    } else {
      return colors[rainbowColors[i++ % rainbowColors.length]](letter);
    }
  };
};

