export class MemoryCookieStore extends Store {
    idx: {};
    inspect(): string;
    findCookie(domain: any, path: any, key: any, cb: any): any;
    findCookies(domain: any, path: any, allowSpecialUseDomain: any, cb: any): any;
    removeCookies(domain: any, path: any, cb: any): any;
    removeAllCookies(cb: any): any;
}
export function inspectFallback(val: any): string;
import Store_1 = require("./store");
import Store = Store_1.Store;
