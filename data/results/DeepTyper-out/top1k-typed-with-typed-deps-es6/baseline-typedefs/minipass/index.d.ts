/// <reference types="node" />
import Stream from 'stream';
export default class Minipass extends Stream {
    constructor(options: any);
    get bufferLength(): any;
    get encoding(): any;
    set encoding(enc: any);
    setEncoding(enc: any): void;
    get objectMode(): any;
    set objectMode(om: any);
    get ['async'](): any;
    set ['async'](a: any);
    write(chunk: any, encoding: any, cb: any): any;
    read(n: any): any;
    end(chunk: any, encoding: any, cb: any): this;
    resume(): any;
    pause(): void;
    get destroyed(): any;
    get flowing(): any;
    get paused(): any;
    pipe(dest: any, opts: any): any;
    unpipe(dest: any): void;
    addListener(ev: any, fn: any): any;
    on(ev: any, fn: any): any;
    get emittedEnd(): any;
    emit(ev: any, data: any, ...extra: any[]): any;
    collect(): any;
    concat(): any;
    promise(): Promise<unknown>;
    destroy(er: any): this;
    static isStream(s: any): boolean;
}
