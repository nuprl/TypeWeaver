import wrapAsync from './wrapAsync.js'
import awaitify from './awaitify.js'

export default function (eachfn: any) {
    return function applyEach(fns: any, ...callArgs: any[]) {
        const go = awaitify(function (callback: Function) {
            var that = this;
            return eachfn(fns, (fn, cb) => {
                wrapAsync(fn).apply(that, callArgs.concat(cb));
            }, callback);
        });
        return go;
    };
}