export = first;
/**
 * Get the first event in a set of event emitters and event pairs.
 *
 * @param {array} stuff
 * @param {function} done
 * @public
 */
declare function first(stuff: any[], done: Function): {
    (fn: any): void;
    cancel: () => void;
};
