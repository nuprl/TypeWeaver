declare var BN: any;
declare var randomBytes: any;
declare function blind(priv: any): any;
declare function getr(priv: any): any;
declare function crt(msg: string, priv: any): any;
declare namespace crt {
    var getr: typeof globalThis.getr;
}
