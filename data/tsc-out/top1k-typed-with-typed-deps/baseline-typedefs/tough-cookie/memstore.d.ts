export class MemoryCookieStore extends Store {
    idx: {};
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
export function inspectFallback(val: any): string;
import Store_1 = require("./store");
import Store = Store_1.Store;
