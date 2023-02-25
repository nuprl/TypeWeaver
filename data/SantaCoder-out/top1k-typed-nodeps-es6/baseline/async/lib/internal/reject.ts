import filter from './filter.js'
import wrapAsync from './wrapAsync.js'

export default function reject(eachfn: any, arr: any, _iteratee: any, callback: any) {
    const iteratee = wrapAsync(_iteratee)
    return filter(eachfn, arr, (value, cb) => {
        iteratee(value, (err, v) => {
            cb(err, !v);
        });
    }, callback);
}