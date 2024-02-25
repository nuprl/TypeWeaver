export default Stream;
declare function Stream(): void;
declare class Stream {
    pipe(dest: any, options: any): any;
}
declare namespace Stream {
    export const Readable: any;
    export const Writable: any;
    export const Duplex: any;
    export const Transform: any;
    export const PassThrough: any;
    export const finished: any;
    export const pipeline: any;
    export { Stream };
}
