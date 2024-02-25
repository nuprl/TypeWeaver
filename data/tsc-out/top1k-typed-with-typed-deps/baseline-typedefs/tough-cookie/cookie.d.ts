export const permuteDomain: typeof import("./permuteDomain").permuteDomain;
import VERSION = require("./version");
export class CookieJar {
    static deserialize: typeof CookieJar.deserialize;
    static deserializeSync(strOrObj: any, store: any): CookieJar;
    constructor(store: any, options?: {
        rejectPublicSuffixes: boolean;
    });
    rejectPublicSuffixes: boolean;
    enableLooseMode: boolean;
    allowSpecialUseDomain: any;
    store: any;
    prefixSecurity: any;
    _cloneSync: (...args: any[]) => undefined;
    _importCookiesSync: (...args: any[]) => undefined;
    getCookiesSync: (...args: any[]) => undefined;
    getCookieStringSync: (...args: any[]) => undefined;
    getSetCookieStringsSync: (...args: any[]) => undefined;
    removeAllCookiesSync: (...args: any[]) => undefined;
    setCookieSync: (...args: any[]) => undefined;
    serializeSync: (...args: any[]) => undefined;
    setCookie(cookie: any, url: any, options: any, cb: any): any;
    getCookies(url: any, options: any, cb: any): any;
    getCookieString(...args: any[]): void;
    getSetCookieStrings(...args: any[]): void;
    serialize(cb: any): any;
    toJSON(): undefined;
    _importCookies(serialized: any, cb: any): any;
    clone(newStore: any, cb: any, ...args: any[]): void;
    cloneSync(newStore: any, ...args: any[]): undefined;
    removeAllCookies(cb: any): any;
}
export namespace CookieJar {
    import fromJSON = CookieJar.deserializeSync;
    export { fromJSON };
}
export class Cookie {
    constructor(options?: {});
    creation: Date;
    inspect(): string;
    toJSON(): {};
    clone(): Cookie;
    validate(): boolean;
    setExpires(exp: any): void;
    expires: string | Date;
    setMaxAge(age: any): void;
    maxAge: any;
    cookieString(): any;
    toString(): any;
    TTL(now: any): number;
    expiryTime(now: any): any;
    expiryDate(now: any): Date;
    isPersistent(): boolean;
    canonicalizedDomain(): any;
    cdomain(): any;
}
export namespace Cookie {
    export const cookiesCreated: number;
    export { parse };
    export { fromJSON };
    export const serializableProperties: string[];
    export namespace sameSiteLevel {
        const strict: number;
        const lax: number;
        const none: number;
    }
    export namespace sameSiteCanonical {
        const strict_1: string;
        export { strict_1 as strict };
        const lax_1: string;
        export { lax_1 as lax };
    }
}
import Store_1 = require("./store");
import Store = Store_1.Store;
import MemoryCookieStore_1 = require("./memstore");
import MemoryCookieStore = MemoryCookieStore_1.MemoryCookieStore;
export function parseDate(str: any): Date;
export function formatDate(date: any): any;
export function parse(str: any, options: any): Cookie;
export function fromJSON(str: any): Cookie;
export function domainMatch(str: any, domStr: any, canonicalize: any): boolean;
export function defaultPath(path: any): any;
import pathMatch_1 = require("./pathMatch");
import pathMatch = pathMatch_1.pathMatch;
export function cookieCompare(a: any, b: any): number;
export function permutePath(path: any): any[];
export function canonicalDomain(str: any): any;
export const PrefixSecurityEnum: Readonly<{
    SILENT: "silent";
    STRICT: "strict";
    DISABLED: "unsafe-disabled";
}>;
export { VERSION as version, Store, MemoryCookieStore, pathMatch, getPublicSuffix, ParameterError };
