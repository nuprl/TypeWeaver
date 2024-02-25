export default DES;
declare function DES(options: any): void;
declare class DES {
    constructor(options: any);
    _desState: DESState;
    deriveKeys(state: any, key: any): void;
    _update(inp: any, inOff: any, out: any, outOff: any): void;
    _pad(buffer: any, off: any): boolean;
    _unpad(buffer: any): any;
    _encrypt(state: any, lStart: any, rStart: any, out: any, off: any): void;
    _decrypt(state: any, lStart: any, rStart: any, out: any, off: any): void;
}
declare namespace DES {
    function create(options: any): DES;
}
declare function DESState(): void;
declare class DESState {
    tmp: any[];
    keys: any;
}
