/// <reference types="node" />
import { Buffer } from 'buffer';
export default bufferEq;
declare function bufferEq(a: Buffer, b: Buffer): boolean;
declare namespace bufferEq {
    var install: () => void;
    var restore: () => void;
}
