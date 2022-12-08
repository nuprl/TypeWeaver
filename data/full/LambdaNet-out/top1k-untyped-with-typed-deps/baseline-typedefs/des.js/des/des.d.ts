declare var assert: string;
declare var inherits: Function;
declare var utils: HTMLElement;
declare var Cipher: Function;
declare function DESState(): void;
declare function DES(options: object): void;
declare namespace DES {
    var create: (options: object) => string;
}
declare var shiftTable: any[];
