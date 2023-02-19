import path from 'path';
path.sep = '/';

export default function(fp: string, stripTrailing: number) {
  fp = path.normalize(fp).replace(/\\+/g, '/');
  if (stripTrailing === false) {
    return fp;
  }
  return fp.replace(/\/$/g, '');
};
