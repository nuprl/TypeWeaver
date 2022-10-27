module['exports'] = function(colors: Object) {
  return function(letter: String, i: Number, exploded: Function) {
    return i % 2 === 0 ? letter : colors.inverse(letter);
  };
};
