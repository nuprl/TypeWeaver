module.exports = function(fp: string, stripTrailing: string) {
  fp = fp.replace(/[\\\/]+/g, '/');
  fp = fp.replace(/^\.\//g, '');
  if (stripTrailing === false) {
    return fp;
  }
  return fp.replace(/\/$/g, '');
};
