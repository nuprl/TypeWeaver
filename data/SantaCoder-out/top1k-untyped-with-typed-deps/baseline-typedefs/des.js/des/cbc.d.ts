declare var assert: any;
declare var inherits: any;
declare var proto: {};
declare function CBCState(iv: Uint8Array): void;
declare function instantiate(Base: any): {
    (options: IOptions): void;
    create(options: IOptions): any;
};
