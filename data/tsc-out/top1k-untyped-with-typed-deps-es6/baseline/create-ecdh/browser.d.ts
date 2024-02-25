export default function createECDH(curve: any): ECDH;
declare function ECDH(curve: any): void;
declare class ECDH {
    constructor(curve: any);
    curveType: any;
    curve: elliptic.ec;
    generateKeys(enc: any, format: any): string | Buffer;
    keys: elliptic.ec.KeyPair;
    computeSecret(other: any, inenc: any, enc: any): string | Buffer;
    getPublicKey(enc: any, format: any): string | Buffer;
    getPrivateKey(enc: any): string | Buffer;
    setPublicKey(pub: any, enc: any): ECDH;
    setPrivateKey(priv: any, enc: any): ECDH;
}
import elliptic from "elliptic";
export {};
