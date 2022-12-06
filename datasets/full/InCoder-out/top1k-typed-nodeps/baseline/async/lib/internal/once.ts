export default function once(fn: Function) {
    function wrapper (...args: any[]) {
        if (fn === null) return;
        var callFn = fn;
        fn = null;
        callFn.apply(this, args);
    }
    Object.assign(wrapper, fn)
    return wrapper
}