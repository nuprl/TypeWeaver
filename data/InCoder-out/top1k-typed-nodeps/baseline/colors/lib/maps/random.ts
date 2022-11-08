module['exports'] = function(colors: Array<string>) {
  var available = ['underline', 'inverse', 'grey', 'yellow', 'red', 'green',
    'blue', 'white', 'cyan', 'magenta', 'brightYellow', 'brightRed',
    'brightGreen', 'brightBlue', 'brightWhite', 'brightCyan', 'brightMagenta'];
  return function(letter: number,  i: number,  exploded: number[]) {
    return letter === ' ' ? letter :
      colors[
          available[Math.round(Math.random() * (available.length - 2))]
      ](letter);
  };
};