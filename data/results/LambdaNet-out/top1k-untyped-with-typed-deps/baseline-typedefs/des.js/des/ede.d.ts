declare var assert: string;
declare var inherits: Function;
declare var Cipher: Function;
declare var DES: HTMLElement;
declare function EDEState(type: string, key: string): void;
declare function EDE(options: Function): void;
declare namespace EDE {
    var create: (options: object) => string;
}
