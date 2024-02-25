export default class Node {
    constructor(opts?: {});
    spaces: {};
    remove(): Node;
    parent: any;
    replaceWith(...args: any[]): Node;
    next(): any;
    prev(): any;
    clone(overrides?: {}): any;
    appendToPropertyAndEscape(name: string, value: any, valueEscaped: string): void;
    raws: {};
    setPropertyAndEscape(name: string, value: any, valueEscaped: string): void;
    setPropertyWithoutEscape(name: string, value: any): void;
    isAtPosition(line: number, column: number): boolean;
    stringifyProperty(name: any): any;
    set rawSpaceBefore(arg: any);
    get rawSpaceBefore(): any;
    set rawSpaceAfter(arg: any);
    get rawSpaceAfter(): any;
    valueToString(): string;
    toString(): string;
}
