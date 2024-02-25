export default Hmac;
declare function Hmac(hash: any, key: any, enc: any): Hmac;
declare class Hmac {
    constructor(hash: any, key: any, enc: any);
    Hash: any;
    blockSize: number;
    outSize: number;
    inner: any;
    outer: any;
    _init(key: any): void;
    update(msg: any, enc: any): Hmac;
    digest(enc: any): any;
}
