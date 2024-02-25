/// <reference types="node" />
/// <reference types="node" />
export = ForeverAgent;
declare function ForeverAgent(options: any): void;
declare class ForeverAgent {
    constructor(options: any);
    options: any;
    requests: {};
    sockets: {};
    freeSockets: {};
    maxSockets: any;
    minSockets: any;
    createConnection: typeof net.createConnection;
    addRequestNoreuse: any;
    addRequest(req: any, host: any, port: any): void;
    removeSocket(s: any, name: any, host: any, port: any): void;
}
declare namespace ForeverAgent {
    export { ForeverAgentSSL as SSL };
    export const defaultMinSockets: number;
}
import net = require("net");
declare function ForeverAgentSSL(options: any): void;
declare class ForeverAgentSSL {
    constructor(options: any);
    createConnection: typeof createConnectionSSL;
    addRequestNoreuse: any;
}
declare function createConnectionSSL(port: any, host: any, options: any): tls.TLSSocket;
import tls = require("tls");
