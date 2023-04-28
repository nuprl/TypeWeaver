/// <reference types="node" />
import Stream from 'stream';
export default through;
declare function through(write: Function, end: Function, opts: Object): Stream;
declare namespace through {
    var through: typeof import(".").default;
}
