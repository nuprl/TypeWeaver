/// <reference types="node" />
declare var assert: any;
declare var inherits: any;
declare var proto: {};
declare function CBCState(iv: Buffer): void;
declare function instantiate(Base: any): {
    (options: CBC.Options): void;
    create(options: CBCOptions): any;
};
