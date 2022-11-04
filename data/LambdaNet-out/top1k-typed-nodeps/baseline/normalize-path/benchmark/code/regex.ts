module.exports = function(fp: String, stripTrailing: Number) {
  fp = fp.replace(/[\\\/]+/g, '/');
  fp = fp.replace(/^\.\//g, '');
  if (stripTrailing === false) {
    return fp;
  }
  return fp.replace(/\/$/g, '');
};