import resolve from '../';
resolve('tap', { basedir: __dirname }, function (err, res) {
    if (err) console.error(err);
    else console.log(res);
});
