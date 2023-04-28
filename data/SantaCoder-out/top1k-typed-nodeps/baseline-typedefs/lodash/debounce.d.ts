declare function debounce(func: Function, wait: number, options: any): {
    (...args: A): any;
    cancel: () => void;
    flush: () => any;
    pending: () => boolean;
};
export default debounce;
