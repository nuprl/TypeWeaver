/// <reference types="node" />
import Stream from 'stream';
export default through;
declare function through(write: any, end: any, opts: any): Stream;
declare namespace through {
    var through: typeof import(".").default;
}
