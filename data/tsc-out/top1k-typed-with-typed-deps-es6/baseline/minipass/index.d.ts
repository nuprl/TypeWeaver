/// <reference types="node" />
export default class Minipass extends Stream {
    static isStream(s: any): boolean;
    constructor(options: any);
    pipes: any[];
    buffer: any[];
    writable: boolean;
    readable: boolean;
    get bufferLength(): any;
    set encoding(arg: any);
    get encoding(): any;
    setEncoding(enc: any): void;
    set objectMode(arg: any);
    get objectMode(): any;
    set async(arg: any);
    get async(): any;
    write(chunk: any, encoding: any, cb: any): any;
    read(n: any): any;
    end(chunk: any, encoding: any, cb: any): Minipass;
    resume(): any;
    pause(): void;
    get destroyed(): any;
    get flowing(): any;
    get paused(): any;
    pipe(dest: any, opts: any): any;
    unpipe(dest: any): void;
    addListener(ev: any, fn: any): Minipass;
    on(ev: any, fn: any): Minipass;
    get emittedEnd(): any;
    emit(ev: any, data: any, ...extra: any[]): any;
    collect(): Promise<any[]>;
    concat(): Promise<string | Buffer>;
    promise(): Promise<any>;
    destroy(er: any): Minipass;
}
import Stream from "stream";
