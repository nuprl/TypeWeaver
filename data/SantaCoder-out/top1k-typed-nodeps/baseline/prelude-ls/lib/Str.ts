// Generated by LiveScript 1.6.0
var split, join, lines, unlines, words, unwords, chars, unchars, reverse, repeat, capitalize, camelize, dasherize;
split = curry$(function(sep: string, str: string){
  return str.split(sep);
});
join = curry$(function(sep: String, xs: Array<String>){
  return xs.join(sep);
});
lines = function(str: string){
  if (!str.length) {
    return [];
  }
  return str.split('\n');
};
unlines = function(it: any){
  return it.join('\n');
};
words = function(str: string){
  if (!str.length) {
    return [];
  }
  return str.split(/[ ]+/);
};
unwords = function(it: any){
  return it.join(' ');
};
chars = function(it: string){
  return it.split('');
};
unchars = function(it: any){
  return it.join('');
};
reverse = function(str: string){
  return str.split('').reverse().join('');
};
repeat = curry$(function(n: number, str: string){
  var result, i$;
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
  return it.replace(/[-_]+(.)?/g, function(arg$: any, c: any){
    return (c != null ? c : '').toUpperCase();
  });
};
dasherize = function(str: string){
  return str.replace(/([^-A-Z])([A-Z]+)/g, function(arg$: number, lower: number, upper: number){
    return lower + "-" + (upper.length > 1
      ? upper
      : upper.toLowerCase());
  }).replace(/^([A-Z]+)/, function(arg$: string, upper: string){
    if (upper.length > 1) {
      return upper + "-";
    } else {
      return upper.toLowerCase();
    }
  });
};
module.exports = {
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
function curry$(f: Function, bound: Array<any>){
  var context,
  _curry = function(args: any[]) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}