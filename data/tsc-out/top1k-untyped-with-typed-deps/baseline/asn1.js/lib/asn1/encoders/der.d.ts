export = DEREncoder;
declare function DEREncoder(entity: any): void;
declare class DEREncoder {
    constructor(entity: any);
    enc: string;
    name: any;
    entity: any;
    tree: DERNode;
    encode(data: any, reporter: any): any;
}
declare function DERNode(parent: any): void;
declare class DERNode {
    constructor(parent: any);
    _encodeComposite(tag: any, primitive: any, cls: any, content: any): any;
    _encodeStr(str: any, tag: any): any;
    _encodeObjid(id: any, values: any, relative: any): any;
    _encodeTime(time: any, tag: any): any;
    _encodeNull(): any;
    _encodeInt(num: any, values: any): any;
    _encodeBool(value: any): any;
    _use(entity: any, obj: any): any;
    _skipDefault(dataBuffer: any, reporter: any, parent: any): boolean;
}
