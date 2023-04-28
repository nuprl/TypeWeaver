import filter from './filter.js'
import wrapAsync from './wrapAsync.js'

export default function reject(eachfn: Function, arr: any[], _iteratee: Function, callback: Function) {
    const iteratee = wrapAsync(_iteratee)
    return filter(eachfn, arr, (value, cb) => {
        iteratee(value, (err, v) => {
            cb(err, !v);
        });
    }, callback);
}