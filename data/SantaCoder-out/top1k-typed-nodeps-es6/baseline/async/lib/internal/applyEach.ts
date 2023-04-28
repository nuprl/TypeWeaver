import wrapAsync from './wrapAsync.js'
import awaitify from './awaitify.js'

export default function (eachfn: Function) {
    return function applyEach(fns: Function[], ...callArgs: any[]) {
        const go = awaitify(function (callback: Function) {
            var that = this;
            return eachfn(fns, (fn, cb) => {
                wrapAsync(fn).apply(that, callArgs.concat(cb));
            }, callback);
        });
        return go;
    };
}