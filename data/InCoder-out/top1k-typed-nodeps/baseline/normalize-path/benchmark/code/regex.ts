module.exports = function(fp: any,  stripTrailing: boolean) {
  fp = fp.replace(/[\\\/]+/g, '/');
  fp = fp.replace(/^\.\//g, '');
  if (stripTrailing === false) {
    return fp;
  }
  return fp.replace(/\/$/g, '');
};