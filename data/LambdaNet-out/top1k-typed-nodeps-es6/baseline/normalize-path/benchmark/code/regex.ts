export default function(fp: string, stripTrailing: number) {
  fp = fp.replace(/[\\\/]+/g, '/');
  fp = fp.replace(/^\.\//g, '');
  if (stripTrailing === false) {
    return fp;
  }
  return fp.replace(/\/$/g, '');
};
