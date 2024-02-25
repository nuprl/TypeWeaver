/// <reference types="node" />
export = PerMessageDeflate;
declare class PerMessageDeflate {
    static get extensionName(): string;
    constructor(options?: {
        clientMaxWindowBits?: (boolean | number);
        clientNoContextTakeover?: boolean;
        concurrencyLimit?: number;
        serverMaxWindowBits?: (boolean | number);
        serverNoContextTakeover?: boolean;
        threshold?: number;
        zlibDeflateOptions?: any;
        zlibInflateOptions?: any;
    }, isServer?: boolean, maxPayload?: number);
    _maxPayload: number;
    _options: {
        clientMaxWindowBits?: (boolean | number);
        clientNoContextTakeover?: boolean;
        concurrencyLimit?: number;
        serverMaxWindowBits?: (boolean | number);
        serverNoContextTakeover?: boolean;
        threshold?: number;
        zlibDeflateOptions?: any;
        zlibInflateOptions?: any;
    };
    _threshold: number;
    _isServer: boolean;
    _deflate: zlib.DeflateRaw;
    _inflate: zlib.InflateRaw;
    params: any;
    public offer(): any;
    public accept(configurations: any[]): any;
    public cleanup(): void;
    private acceptAsServer;
    private acceptAsClient;
    private normalizeParams;
    public decompress(data: Buffer, fin: boolean, callback: Function): void;
    public compress(data: (Buffer | string), fin: boolean, callback: Function): void;
    private _decompress;
    private _compress;
}
import zlib = require("zlib");
