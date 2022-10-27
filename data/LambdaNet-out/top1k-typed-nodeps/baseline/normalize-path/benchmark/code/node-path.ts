var path: String = require('path');
path.sep = '/';

module.exports = function(fp: String, stripTrailing: Number) {
  fp = path.normalize(fp).replace(/\\+/g, '/');
  if (stripTrailing === false) {
    return fp;
  }
  return fp.replace(/\/$/g, '');
};
