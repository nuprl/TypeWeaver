/// <reference types="node" />
declare var assert: any;
declare var inherits: any;
declare var Cipher: any;
declare var DES: typeof DES;
declare function EDEState(type: string, key: Buffer): void;
declare function EDE(options: any): void;
declare namespace EDE {
    var create: (options: any) => any;
}
