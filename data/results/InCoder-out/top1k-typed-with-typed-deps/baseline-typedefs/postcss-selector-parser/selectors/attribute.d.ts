import Namespace from './namespace';
export declare function unescapeValue(value: any): {
    deprecatedUsage: boolean;
    unescaped: any;
    quoteMark: any;
};
export default class Attribute extends Namespace {
    static NO_QUOTE: any;
    static SINGLE_QUOTE: string;
    static DOUBLE_QUOTE: string;
    constructor(opts?: {});
    getQuotedValue(options?: {}): string;
    _determineQuoteMark(options: any): any;
    setValue(value: any, options?: {}): void;
    smartQuoteMark(options: any): any;
    preferredQuoteMark(options: any): any;
    get quoted(): boolean;
    set quoted(value: boolean);
    get quoteMark(): any;
    set quoteMark(quoteMark: any);
    _syncRawValue(): void;
    get qualifiedAttribute(): any;
    get insensitiveFlag(): "" | "i";
    get value(): any;
    set value(v: any);
    get attribute(): any;
    set attribute(name: any);
    _handleEscapes(prop: any, value: any): void;
    _spacesFor(name: any): any;
    _stringFor(name: any, spaceName?: any, concat?: typeof defaultAttrConcat): string;
    offsetOf(name: any): number;
    toString(): string;
}
declare function defaultAttrConcat(attrValue: any, attrSpaces: number): string;
export {};
