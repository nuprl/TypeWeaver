export default function onlyOnce(fn: Function) {
    return function (...args: any[]) {
        if (fn === null) throw new Error("Callback was already called.");
        var callFn = fn;
        fn = null;
        callFn.apply(this, args);
    };
}