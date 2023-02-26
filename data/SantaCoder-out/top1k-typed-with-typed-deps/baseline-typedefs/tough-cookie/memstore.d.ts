declare const fromCallback: any;
declare const Store: any;
declare const permuteDomain: any;
declare const pathMatch: any;
declare const getCustomInspectSymbol: any, getUtilInspect: any;
declare class MemoryCookieStore extends Store {
    constructor();
    inspect(): string;
    findCookie(domain: any, path: any, key: any, cb: any): any;
    findCookies(domain: any, path: any, allowSpecialUseDomain: any, cb: any): any;
    putCookie(cookie: any, cb: any): void;
    updateCookie(oldCookie: any, newCookie: any, cb: any): void;
    removeCookie(domain: any, path: any, key: any, cb: any): void;
    removeCookies(domain: any, path: any, cb: any): any;
    removeAllCookies(cb: any): any;
    getAllCookies(cb: any): void;
}
declare function inspectFallback(val: any): string;
declare function formatDomain(domainName: string, domainValue: string): string;
declare function formatPath(pathName: string, pathValue: string): string;
