/// <reference types="node" />
declare function crt(msg: string, priv: Buffer): Buffer;
declare namespace crt {
    var getr: (priv: RSA) => any;
}
export default crt;
