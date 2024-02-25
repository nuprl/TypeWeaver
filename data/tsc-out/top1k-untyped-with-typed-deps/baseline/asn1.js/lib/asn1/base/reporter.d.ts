export function Reporter(options: any): void;
export class Reporter {
    constructor(options: any);
    _reporterState: {
        obj: any;
        path: any[];
        options: any;
        errors: any[];
    };
    isError(obj: any): boolean;
    save(): {
        obj: any;
        pathLen: number;
    };
    restore(data: any): void;
    enterKey(key: any): number;
    exitKey(index: any): void;
    leaveKey(index: any, key: any, value: any): void;
    path(): string;
    enterObject(): any;
    leaveObject(prev: any): any;
    error(msg: any): ReporterError;
    wrapResult(result: any): any;
}
declare function ReporterError(path: any, msg: any): void;
declare class ReporterError {
    constructor(path: any, msg: any);
    path: any;
    rethrow(msg: any): ReporterError;
    message: string;
    stack: any;
}
export {};
