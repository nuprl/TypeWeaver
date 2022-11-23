/// <reference types="node" />
declare function getStdin(): Promise<string>;
declare namespace getStdin {
    var buffer: () => Promise<Buffer>;
}
export default getStdin;
