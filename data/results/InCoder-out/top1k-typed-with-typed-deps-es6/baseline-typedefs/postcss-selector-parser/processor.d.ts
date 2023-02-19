export default class Processor {
    constructor(func: any, options: any);
    _shouldUpdateSelector(rule: any, options?: {}): boolean;
    _isLossy(options?: {}): boolean;
    _root(rule: any, options?: {}): any;
    _parseOptions(options: any): {
        lossy: boolean;
    };
    _run(rule: any, options?: {}): Promise<unknown>;
    _runSync(rule: any, options?: {}): {
        transform: any;
        root: any;
        string: any;
    };
    ast(rule: any, options: any): Promise<any>;
    astSync(rule: any, options: any): any;
    transform(rule: any, options: any): Promise<any>;
    transformSync(rule: any, options: any): any;
    process(rule: any, options: any): Promise<any>;
    processSync(rule: any, options: any): any;
}
