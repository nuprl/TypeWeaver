module.exports = function normalize(str: any[]): any[] {
  str = str.split('\\').join('//');
  if (str[str.length - 1] === '/') {
    return str.slice(0, str.length - 1);
  }
  return str;
};
