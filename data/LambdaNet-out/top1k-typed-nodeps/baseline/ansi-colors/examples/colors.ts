
const colors: Array = require('..');
console.log(colors.unstyle(colors.green('this is not green!')));

const cyan: Function = colors.cyan;
const key: String = cyan.underline('a');
console.log(cyan('foo'));
