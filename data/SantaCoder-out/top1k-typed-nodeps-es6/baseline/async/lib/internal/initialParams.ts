export default function (fn: Function) {
    return function (...args/*: any[], callback*/: any) {
        var callback = args.pop();
        return fn.call(this, args, callback);
    };
}