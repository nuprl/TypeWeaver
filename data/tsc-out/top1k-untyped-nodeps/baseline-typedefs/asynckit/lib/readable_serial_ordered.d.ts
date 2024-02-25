export = ReadableSerialOrdered;
declare function ReadableSerialOrdered(list: any[] | object, iterator: Function, sortMethod: Function, callback: Function): stream.Readable;
declare namespace ReadableSerialOrdered {
    export { ascending, descending };
}
