declare var async: any;
declare function wrapIterator(iterator: Iterator<any>): (item: any, key: any, cb: any) => any;
declare function wrapCallback(callback: Function): (error: any, result: any) => any;
declare function wrapIteratorCallback(callback: Function, key: string): (error: any, output: any) => any;
declare function streamer(error: Error, output: string, callback: Function): void;
declare function finisher(error: Error, output: string, callback: Function): void;
