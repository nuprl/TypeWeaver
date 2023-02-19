declare var required: Function, qs: any[], controlOrWhitespace: RegExp, CRHTLF: RegExp, slashes: RegExp, port: RegExp, protocolre: RegExp, windowsDriveLetter: RegExp;
declare function trimLeft(str: string): string;
declare function trim(str: string): any[];
declare var rules: any[];
declare var ignore: object;
declare function lolcation(loc: object): object;
declare function isSpecial(scheme: number): boolean;
declare function extractProtocol(address: string, location: object): object;
declare function resolve(relative: string, base: string): string;
declare function Url(address: string, location: object, parser: Function): string;
declare namespace Url {
    var extractProtocol: typeof globalThis.extractProtocol;
    var location: typeof lolcation;
    var trimLeft: typeof globalThis.trimLeft;
    var qs: any[];
}
declare function set(part: number, value: string, fn: boolean): string;
