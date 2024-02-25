export = RawSource;
declare class RawSource extends Source {
    constructor(value: any, convertToString?: boolean);
    _valueIsBuffer: boolean;
    _value: string | Buffer;
    _valueAsBuffer: Buffer;
    _valueAsString: string;
    isBuffer(): boolean;
    source(): string | Buffer;
    /**
     * @param {object} options options
     * @param {function(string, number, number, number, number, number, number): void} onChunk called for each chunk of code
     * @param {function(number, string, string)} onSource called for each source
     * @param {function(number, string)} onName called for each name
     * @returns {void}
     */
    streamChunks(options: object, onChunk: (arg0: string, arg1: number, arg2: number, arg3: number, arg4: number, arg5: number, arg6: number) => void, onSource: (arg0: number, arg1: string, arg2: string) => any, onName: (arg0: number, arg1: string) => any): void;
}
import Source = require("./Source");
