module['exports'] = function(colors: Object) {
  // RoY G BiV
  var rainbowColors: Array = ['red', 'yellow', 'green', 'blue', 'magenta'];
  return function(letter: String, i: Number, exploded: Function) {
    if (letter === ' ') {
      return letter;
    } else {
      return colors[rainbowColors[i++ % rainbowColors.length]](letter);
    }
  };
};

