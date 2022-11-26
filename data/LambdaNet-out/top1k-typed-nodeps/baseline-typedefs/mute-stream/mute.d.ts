declare var Stream: any[];
declare function MuteStream(opts: string): void;
declare namespace MuteStream {
    var prototype: any;
}
declare function onPipe(src: Function): void;
declare function getIsTTY(): boolean;
declare function setIsTTY(isTTY: number): void;
declare function proxy(fn: string): Function;
