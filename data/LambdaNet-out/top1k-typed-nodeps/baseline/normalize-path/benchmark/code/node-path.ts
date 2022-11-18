var path: string = require('path');
path.sep = '/';

module.exports = function(fp: string, stripTrailing: number) {
  fp = path.normalize(fp).replace(/\\+/g, '/');
  if (stripTrailing === false) {
    return fp;
  }
  return fp.replace(/\/$/g, '');
};
