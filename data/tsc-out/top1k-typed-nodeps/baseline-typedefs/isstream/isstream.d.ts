export = isStream;
declare function isStream(obj: any): boolean;
declare namespace isStream {
    export { isReadable, isWritable, isDuplex };
}
declare function isReadable(obj: any): boolean;
declare function isWritable(obj: any): boolean;
declare function isDuplex(obj: any): boolean;
