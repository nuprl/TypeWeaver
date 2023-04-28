export default function (fn: Function) {
    return function (...args/*: any[], callback*/: Function) {
        var callback = args.pop();
        return fn.call(this, args, callback);
    };
}