export default EDE;
declare function EDE(options: any): void;
declare class EDE {
    constructor(options: any);
    _edeState: EDEState;
    _update(inp: any, inOff: any, out: any, outOff: any): void;
    _pad: (buffer: any, off: any) => boolean;
    _unpad: (buffer: any) => any;
}
declare namespace EDE {
    function create(options: any): EDE;
}
declare function EDEState(type: any, key: any): void;
declare class EDEState {
    constructor(type: any, key: any);
    ciphers: DES[];
}
import DES from "./des";
