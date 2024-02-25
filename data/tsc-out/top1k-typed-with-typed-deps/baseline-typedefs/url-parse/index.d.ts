export = Url;
declare function Url(address: string, location?: any | string, parser?: boolean | Function): Url;
declare class Url {
    private constructor();
    slashes: any;
    protocol: any;
    query: any;
    username: string;
    password: string;
    origin: string;
    href: string;
    set: typeof set;
    toString: typeof toString;
}
declare namespace Url {
    export { extractProtocol, lolcation as location, trimLeft, qs, ProtocolExtract };
}
declare function set(part: string, value: Mixed, fn: boolean | Function): URL;
declare class set {
    constructor(part: string, value: Mixed, fn: boolean | Function);
    auth: any;
    origin: string;
    href: string;
}
declare function toString(stringify: Function): string;
declare function extractProtocol(address: string, location: any): ProtocolExtract;
declare function lolcation(loc: any | string): any;
declare function trimLeft(str: any | string): string;
import qs = require("querystringify");
type ProtocolExtract = {
    slashes: boolean;
    rest: string;
};
