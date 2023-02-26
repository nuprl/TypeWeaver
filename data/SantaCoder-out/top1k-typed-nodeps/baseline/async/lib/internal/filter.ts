import isArrayLike from './isArrayLike.js'
import wrapAsync from './wrapAsync.js'

function filterArray(eachfn: any, arr: any[], iteratee: any, callback: any) {
    var truthValues = new Array(arr.length);
    eachfn(arr, (x, index, iterCb) => {
        iteratee(x, (err, v) => {
            truthValues[index] = !!v;
            iterCb(err);
        });
    }, err => {
        if (err) return callback(err);
        var results = [];
        for (var i = 0; i < arr.length; i++) {
            if (truthValues[i]) results.push(arr[i]);
        }
        callback(null, results);
    });
}

function filterGeneric(eachfn: any, coll: any, iteratee: any, callback: any) {
    var results = [];
    eachfn(coll, (x, index, iterCb) => {
        iteratee(x, (err, v) => {
            if (err) return iterCb(err);
            if (v) {
                results.push({index, value: x});
            }
            iterCb(err);
        });
    }, err => {
        if (err) return callback(err);
        callback(null, results
            .sort((a, b) => a.index - b.index)
            .map(v => v.value));
    });
}

export default function _filter(eachfn: any, coll: any, iteratee: any, callback: any) {
    var filter = isArrayLike(coll) ? filterArray : filterGeneric;
    return filter(eachfn, coll, wrapAsync(iteratee), callback);
}