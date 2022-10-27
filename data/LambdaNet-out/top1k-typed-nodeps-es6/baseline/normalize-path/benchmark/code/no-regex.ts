export default function normalize(str: String): String {
  str = replace(str, '\\', '/');
  str = replace(str, '//', '/');

  var last: String = str[str.length - 1];

  if (str[0] === '.' && str[1] === '/') {
    str = str.substr(2, str.length - 1);
  }

  if (last === '/') {
    str = str.substr(0, str.length - 1);
  }

  return str.toLowerCase();
};


function replace(str: String, pattern: String, replacement: String): String {
  var i: Number, from: Number = 0;

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