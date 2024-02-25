/// <reference types="node" />
export default crc32;
declare function crc32(...args: any[]): Buffer;
declare namespace crc32 {
    function signed(...args: any[]): any;
    function unsigned(...args: any[]): number;
}
import { Buffer } from "buffer";
