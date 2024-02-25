export default PseudoMap;
declare function PseudoMap(set: any): void;
declare class PseudoMap {
    constructor(set: any);
    forEach(fn: any, thisp: any): void;
    has(k: any): boolean;
    get(k: any): any;
    set(k: any, v: any): void;
    delete(k: any): void;
    clear(): void;
    set size(arg: any);
    get size(): any;
    values: () => never;
    keys: () => never;
    entries(): never;
}
