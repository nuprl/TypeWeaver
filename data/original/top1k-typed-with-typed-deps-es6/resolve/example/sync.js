import resolve from '../';
var res = resolve.sync('tap', { basedir: __dirname });
console.log(res);
