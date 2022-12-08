export default function(fp: string, stripTrailing: string) {
  fp = fp.replace(/[\\\/]+/g, '/');
  fp = fp.replace(/^\.\//g, '');
  if (stripTrailing === false) {
    return fp;
  }

  return fp.slice(-1) === '/'
    ? fp.slice(0, fp.length -1)
    : fp;
};
