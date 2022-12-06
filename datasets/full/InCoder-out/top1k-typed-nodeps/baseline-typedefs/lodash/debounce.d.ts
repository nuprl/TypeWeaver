declare function debounce(func: Function, wait: number, options: Object): {
    (...args: any[]): any;
    cancel: () => void;
    flush: () => any;
    pending: () => boolean;
};
export default debounce;
