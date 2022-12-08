declare var async: any;
declare function wrapIterator(iterator: any): any;
declare function wrapCallback(callback: any): any;
declare function wrapIteratorCallback(callback: any, key: string): any;
declare function streamer(error: Error, output: any, callback: any): void;
declare function finisher(error: any, output: any, callback: any): void;
