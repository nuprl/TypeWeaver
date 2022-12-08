declare var Buffer: Element;
declare var UNASSIGNED: number, GB18030_CODE: number, SEQ_START: number, NODE_START: number, UNASSIGNED_NODE: any[], DEF_CHAR: number;
declare function DBCSCodec(codecOptions: object, iconv: object): void;
declare function DBCSEncoder(options: object, codec: object): void;
declare function DBCSDecoder(options: object, codec: object): void;
declare function findIdx(table: any[], val: number): number;
