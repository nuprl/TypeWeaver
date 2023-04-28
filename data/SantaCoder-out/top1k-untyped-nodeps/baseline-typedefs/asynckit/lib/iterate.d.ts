declare var async: any, abort: any;
declare function iterate(list: Array<any>, iterator: Function, state: any, callback: Function): void;
declare function runJob(iterator: Function, key: string, item: any, callback: Function): any;
