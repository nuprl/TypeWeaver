export = DelayedStream;
declare function DelayedStream(): void;
declare class DelayedStream {
    source: any;
    dataSize: number;
    maxDataSize: number;
    pauseStream: boolean;
    _maxDataSizeExceeded: boolean;
    _released: boolean;
    _bufferedEvents: any[];
    get readable(): any;
    setEncoding(...args: any[]): any;
    resume(): void;
    pause(): void;
    release(): void;
    pipe(...args: any[]): any;
    _handleEmit(args: any): void;
    _checkIfMaxDataSizeExceeded(): void;
}
declare namespace DelayedStream {
    function create(source: any, options: any): DelayedStream;
}
