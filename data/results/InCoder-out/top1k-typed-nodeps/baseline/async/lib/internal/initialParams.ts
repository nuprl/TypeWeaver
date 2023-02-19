export default function (fn: Function) {
    return function (...args/*: Array<any>,  callback*/: Function) {
        var callback = args.pop();
        return fn.call(this, args, callback);
    };
}