/// <reference types="node" />
import { Buffer } from 'buffer';
declare function crc32(): Buffer;
declare namespace crc32 {
    var signed: () => any;
    var unsigned: () => number;
}
export default crc32;
