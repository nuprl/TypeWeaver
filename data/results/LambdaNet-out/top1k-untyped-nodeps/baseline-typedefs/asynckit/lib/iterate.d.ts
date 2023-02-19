declare var async: Function, abort: Function;
declare function iterate(list: object, iterator: string, state: object, callback: Function): void;
declare function runJob(iterator: Function, key: string, item: string, callback: string): object;
