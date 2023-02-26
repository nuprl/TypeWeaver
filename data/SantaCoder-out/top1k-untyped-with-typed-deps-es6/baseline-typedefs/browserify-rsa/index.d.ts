/// <reference types="node" />
declare function crt(msg: string, priv: string): Buffer;
declare namespace crt {
    var getr: (priv: BigInt) => any;
}
export default crt;
