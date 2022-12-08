declare class PerMessageDeflate {
    constructor(options: any, isServer: any, maxPayload: any);
    static get extensionName(): string;
    offer(): {};
    accept(configurations: any): any;
    cleanup(): void;
    acceptAsServer(offers: any): any;
    acceptAsClient(response: any): any;
    normalizeParams(configurations: any): any;
    decompress(data: any, fin: any, callback: any): void;
    compress(data: any, fin: any, callback: any): void;
    _decompress(data: any, fin: any, callback: any): void;
    _compress(data: any, fin: any, callback: any): void;
}
export default PerMessageDeflate;
