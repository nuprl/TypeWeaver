export default DERDecoder;
declare function DERDecoder(entity: any): void;
declare class DERDecoder {
    constructor(entity: any);
    enc: string;
    name: any;
    entity: any;
    tree: DERNode;
    decode(data: any, options: any): any;
}
declare function DERNode(parent: any): void;
declare class DERNode {
    constructor(parent: any);
    _peekTag(buffer: any, tag: any, any: any): any;
    _decodeTag(buffer: any, tag: any, any: any): any;
    _skipUntilEnd(buffer: any, fail: any): any;
    _decodeList(buffer: any, tag: any, decoder: any, options: any): any;
    _decodeStr(buffer: any, tag: any): any;
    _decodeObjid(buffer: any, values: any, relative: any): any;
    _decodeTime(buffer: any, tag: any): any;
    _decodeNull(): any;
    _decodeBool(buffer: any): any;
    _decodeInt(buffer: any, values: any): bignum;
    _use(entity: any, obj: any): any;
}
import bignum from "bn.js";
