declare const Stream: any;
declare const PassThrough: any;
declare const slice: (start?: number, end?: number) => any[];
declare function merge2(): any;
declare function pauseStreams(streams: Array<MediaStream>, options: {
    end: true;
}): MediaStream[];
