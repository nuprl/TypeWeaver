declare function throttle(func: Function, wait: number, options: Object): {
    (...args: A): any;
    cancel: () => void;
    flush: () => any;
    pending: () => boolean;
};
export default throttle;
