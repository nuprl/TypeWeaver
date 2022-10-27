
const colors: any = require('ansi-colors');
const parse: any = require('./parse');
const color: any = (arr: any, c: any) => arr.map((s: string) => c(s)).join(', ');
const cp: any = require('child_process');
const braces: any = (input: any) => {
  return cp.execSync(`echo ${input}`).toString().trim().split(' ');
};

// const fixture = '{a,{b,c},d}';
// const fixture = '{a,b}{c,d}{e,f}';
// const fixture = 'a/{b,c{x,y}d,e}/f';
// const fixture = '{{a,b}/i,j,k}';
// const fixture = '{c,d{e,f}g,h}';
// const fixture = '{{c,d{e,f}g,h}/i,j,k}';
// const fixture = '{a,b}/{c,d{e,f}g,h}';
// const fixture = '{{a,b}/{c,d{e,f}g,h}/i,j,k}';
// const fixture = '{x,y,{a,b,c\\}}';
const fixture: string = 'a{,b}c';
console.log();
console.log(' FIXTURE:', colors.magenta(fixture));
console.log('  ACTUAL:', color(expand(parse(fixture)), colors.yellow));
console.log('EXPECTED:', color(braces(fixture), colors.blue));
console.log();
