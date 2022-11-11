module.exports = function normalize(str: string | undefined) {
  str = str.split('\\').join('//');
  if (str[str.length - 1] === '/') {
    return str.slice(0, str.length - 1);
  }
  return str;
};