declare var Buffer: any;
declare var UNASSIGNED: number, GB18030_CODE: number, SEQ_START: number, NODE_START: number, UNASSIGNED_NODE: any[], DEF_CHAR: number;
declare function DBCSCodec(codecOptions: any, iconv: any): void;
declare function DBCSEncoder(options: any, codec: any): void;
declare function DBCSDecoder(options: any, codec: any): void;
declare function findIdx(table: number[], val: number): number;
