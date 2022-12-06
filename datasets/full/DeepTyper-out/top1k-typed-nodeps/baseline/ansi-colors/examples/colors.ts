
const colors: any = require('..');
console.log(colors.unstyle(colors.green('this is not green!')));

const cyan: any = colors.cyan;
const key: any = cyan.underline('a');
console.log(cyan('foo'));
