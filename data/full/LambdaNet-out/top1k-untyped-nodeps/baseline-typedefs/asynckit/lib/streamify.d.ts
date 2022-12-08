declare var async: Function;
declare function wrapIterator(iterator: Function): Function;
declare function wrapCallback(callback: string): Function;
declare function wrapIteratorCallback(callback: Function, key: string): Function;
declare function streamer(error: object, output: object, callback: Function): void;
declare function finisher(error: object, output: string, callback: Function): void;
