export default function normalize(str: string): string {
  str = replace(str, '\\', '/');
  str = replace(str, '//', '/');

  var last: string = str[str.length - 1];

  if (str[0] === '.' && str[1] === '/') {
    str = str.substr(2, str.length - 1);
  }

  if (last === '/') {
    str = str.substr(0, str.length - 1);
  }

  return str.toLowerCase();
};


function replace(str: string, pattern: string, replacement: string): any {
  var i: number, from = 0;

  while (str.indexOf(pattern, from) !== -1) {
    i = str.indexOf(pattern, from);
    from = i + pattern.length;
    str = str.substr(0, i)
      + replacement
      + str.substr(from, str.length);
    from = i + replacement.length;
  }
  return str;
}