declare var async: any;
declare function wrapIterator(iterator: Iterator<any>): (item: any, key: string, cb: any) => any;
declare function wrapCallback(callback: Function): (error: any, result: any) => any;
declare function wrapIteratorCallback(callback: Function, key: string): (error: Error, output: IOutput) => any;
declare function streamer(error: Error, output: string, callback: any): void;
declare function finisher(error: Error, output: string, callback: any): void;
