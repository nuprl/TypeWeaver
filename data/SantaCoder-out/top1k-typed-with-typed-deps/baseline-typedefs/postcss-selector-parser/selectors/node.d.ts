export default class Node {
    constructor(opts?: {});
    remove(): this;
    replaceWith(): this;
    next(): any;
    prev(): any;
    clone(overrides?: {}): any;
    appendToPropertyAndEscape(name: any, value: any, valueEscaped: any): void;
    setPropertyAndEscape(name: any, value: any, valueEscaped: any): void;
    setPropertyWithoutEscape(name: any, value: any): void;
    isAtPosition(line: any, column: any): boolean;
    stringifyProperty(name: any): any;
    get rawSpaceBefore(): any;
    set rawSpaceBefore(raw: any);
    get rawSpaceAfter(): any;
    set rawSpaceAfter(raw: any);
    valueToString(): string;
    toString(): string;
}
