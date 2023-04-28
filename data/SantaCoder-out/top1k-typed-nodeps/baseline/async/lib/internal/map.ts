import wrapAsync from './wrapAsync.js'

export default function _asyncMap(eachfn: EachOfIteratorFunc, arr: any[], iteratee: AsyncIterator<any>, callback: AsyncResultCallback<any[]>) {
    arr = arr || [];
    var results = [];
    var counter = 0;
    var _iteratee = wrapAsync(iteratee);

    return eachfn(arr, (value, _, iterCb) => {
        var index = counter++;
        _iteratee(value, (err, v) => {
            results[index] = v;
            iterCb(err);
        });
    }, err => {
        callback(err, results);
    });
}