/// <reference types="node" />
export = crc32;
declare function crc32(...args: any[]): Buffer;
declare namespace crc32 {
    function signed(...args: any[]): any;
    function unsigned(...args: any[]): number;
}
import Buffer_1 = require("node/buffer");
import Buffer = Buffer_1.Buffer;
