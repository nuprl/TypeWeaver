module['exports'] = function(colors: string[]) {
  // RoY G BiV
  var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta'];
  return function(letter: string, i: number, exploded: string[]) {
    if (letter === ' ') {
      return letter;
    } else {
      return colors[rainbowColors[i++ % rainbowColors.length]](letter);
    }
  };
};
