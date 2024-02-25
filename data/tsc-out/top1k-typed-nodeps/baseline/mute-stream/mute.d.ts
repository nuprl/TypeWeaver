export = MuteStream;
declare function MuteStream(opts: any): void;
declare class MuteStream {
    constructor(opts: any);
    writable: boolean;
    readable: boolean;
    muted: boolean;
    replace: any;
    _prompt: any;
    _hadControl: boolean;
    readonly constructor: typeof MuteStream;
    mute(): void;
    unmute(): void;
    _onpipe: typeof onPipe;
    set isTTY(arg: any);
    get isTTY(): any;
    get rows(): any;
    get columns(): any;
    pipe(dest: any, options: any): any;
    _dest: any;
    pause(): any;
    resume(): any;
    write(c: any): any;
    end(c: any): void;
    destroy: (...args: any[]) => void;
    destroySoon: (...args: any[]) => void;
    close: (...args: any[]) => void;
}
declare function onPipe(src: any): void;
declare class onPipe {
    constructor(src: any);
    _src: any;
}
