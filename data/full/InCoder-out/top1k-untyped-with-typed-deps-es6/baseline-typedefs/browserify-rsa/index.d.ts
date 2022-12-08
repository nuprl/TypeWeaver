/// <reference types="node" />
declare function crt(msg: Buffer, priv: Buffer): Buffer;
declare namespace crt {
    var getr: (priv: Buffer) => any;
}
export default crt;
