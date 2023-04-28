declare var assert: any;
declare var inherits: any;
declare var utils: any;
declare var Cipher: any;
declare function DESState(): void;
declare function DES(options: any): void;
declare namespace DES {
    var create: (options: DESOptions) => any;
}
declare var shiftTable: number[];
