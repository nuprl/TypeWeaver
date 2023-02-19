
import colors from '..';
console.log(colors.unstyle(colors.green('this is not green!')));

const cyan: any = colors.cyan;
const key: string = cyan.underline('a');
console.log(cyan('foo'));
