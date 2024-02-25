export function unescapeValue(value: any): {
    deprecatedUsage: boolean;
    unescaped: any;
    quoteMark: any;
};
export default class Attribute extends Namespace {
    static NO_QUOTE: any;
    static SINGLE_QUOTE: string;
    static DOUBLE_QUOTE: string;
    type: "attribute";
    _constructed: boolean;
    getQuotedValue(options?: {}): string;
    _determineQuoteMark(options: any): any;
    setValue(value: any, options?: {}): void;
    _value: any;
    _quoteMark: any;
    smartQuoteMark(options: any): any;
    preferredQuoteMark(options: any): any;
    set quoted(arg: boolean);
    get quoted(): boolean;
    set quoteMark(arg: "'" | "\"");
    get quoteMark(): "'" | "\"";
    _syncRawValue(): void;
    get qualifiedAttribute(): any;
    get insensitiveFlag(): "" | "i";
    set value(arg: any);
    get value(): any;
    set attribute(arg: any);
    get attribute(): any;
    _attribute: any;
    _handleEscapes(prop: any, value: any): void;
    _spacesFor(name: any): any;
    _stringFor(name: any, spaceName?: any, concat?: typeof defaultAttrConcat): string;
    offsetOf(name: any): number;
}
import Namespace from "./namespace";
declare function defaultAttrConcat(attrValue: any, attrSpaces: any): string;
export {};
