export default first;
declare function first(stuff: any[], done: Function): {
    (fn: any): void;
    cancel: () => void;
};
