declare var required: any, qs: any, controlOrWhitespace: RegExp, CRHTLF: RegExp, slashes: RegExp, port: RegExp, protocolre: RegExp, windowsDriveLetter: RegExp;
declare function trimLeft(str: string): string;
declare function trim(str: string): string;
declare var rules: string[];
declare var ignore: any;
declare function lolcation(loc: any): any;
declare function isSpecial(scheme: string): boolean;
declare function extractProtocol(address: string, location: any): void;
declare function resolve(relative: string, base: string): any;
declare function Url(address: string, location: any, parser: any): any;
declare namespace Url {
    var extractProtocol: typeof globalThis.extractProtocol;
    var location: typeof lolcation;
    var trimLeft: typeof globalThis.trimLeft;
    var qs: any;
}
declare function set(part: string, value: any, fn: any): any;
