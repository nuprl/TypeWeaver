export class Store {
    synchronous: boolean;
    findCookie(domain: any, path: any, key: any, cb: any): void;
    findCookies(domain: any, path: any, allowSpecialUseDomain: any, cb: any): void;
    putCookie(cookie: any, cb: any): void;
    updateCookie(oldCookie: any, newCookie: any, cb: any): void;
    removeCookie(domain: any, path: any, key: any, cb: any): void;
    removeCookies(domain: any, path: any, cb: any): void;
    removeAllCookies(cb: any): void;
    getAllCookies(cb: any): void;
}
