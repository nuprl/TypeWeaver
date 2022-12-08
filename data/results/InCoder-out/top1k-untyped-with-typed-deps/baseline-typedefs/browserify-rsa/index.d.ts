/// <reference types="node" />
declare var BN: any;
declare var randomBytes: any;
declare function blind(priv: Buffer): {
    blinder: any;
    unblinder: any;
};
declare function getr(priv: Buffer): any;
declare function crt(msg: Buffer, priv: Buffer): any;
declare namespace crt {
    var getr: typeof globalThis.getr;
}
