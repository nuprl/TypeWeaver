// Generated by LiveScript 1.6.0
var split: object, join: string, lines: Function, unlines: Function, words: Function, unwords: Function, chars: Function, unchars: Function, reverse: Function, repeat: string, capitalize: Function, camelize: Function, dasherize: Function;
split = curry$(function(sep: any[], str: string){
  return str.split(sep);
});
join = curry$(function(sep: string, xs: object){
  return xs.join(sep);
});
lines = function(str: string){
  if (!str.length) {
    return [];
  }
  return str.split('\n');
};
unlines = function(it: object){
  return it.join('\n');
};
words = function(str: string){
  if (!str.length) {
    return [];
  }
  return str.split(/[ ]+/);
};
unwords = function(it: object){
  return it.join(' ');
};
chars = function(it: string){
  return it.split('');
};
unchars = function(it: object){
  return it.join('');
};
reverse = function(str: string){
  return str.split('').reverse().join('');
};
repeat = curry$(function(n: number, str: string){
  var result: string, i$: number;
  result = '';
  for (i$ = 0; i$ < n; ++i$) {
    result += str;
  }
  return result;
});
capitalize = function(str: string){
  return str.charAt(0).toUpperCase() + str.slice(1);
};
camelize = function(it: string){
  return it.replace(/[-_]+(.)?/g, function(arg$: Function, c: string){
    return (c != null ? c : '').toUpperCase();
  });
};
dasherize = function(str: string){
  return str.replace(/([^-A-Z])([A-Z]+)/g, function(arg$: Function, lower: number, upper: string){
    return lower + "-" + (upper.length > 1
      ? upper
      : upper.toLowerCase());
  }).replace(/^([A-Z]+)/, function(arg$: number, upper: string){
    if (upper.length > 1) {
      return upper + "-";
    } else {
      return upper.toLowerCase();
    }
  });
};

export default {
  split: split,
  join: join,
  lines: lines,
  unlines: unlines,
  words: words,
  unwords: unwords,
  chars: chars,
  unchars: unchars,
  reverse: reverse,
  repeat: repeat,
  capitalize: capitalize,
  camelize: camelize,
  dasherize: dasherize
};

function curry$(f: any[], bound: boolean): boolean{
  var context: string,
  _curry: Function = function(args: Promise) {
    return f.length > 1 ? function(){
      var params: any[] = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}