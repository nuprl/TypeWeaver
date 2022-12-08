
import colors from '..';
console.log(colors.unstyle(colors.green('this is not green!')));

const cyan: Function = colors.cyan;
const key: string = cyan.underline('a');
console.log(cyan('foo'));
