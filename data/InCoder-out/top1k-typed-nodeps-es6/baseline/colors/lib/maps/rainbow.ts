module['exports'] = function(colors: Array<string>) {
  // RoY G BiV
  var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta'];
  return function(letter: endofmask|>,  i: number,  exploded: number) {
    if (letter === ' ') {
      return letter;
    } else {
      return colors[rainbowColors[i++ % rainbowColors.length]](letter);
    }
  };
};
