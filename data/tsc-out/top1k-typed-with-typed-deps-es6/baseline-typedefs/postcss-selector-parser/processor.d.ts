export default class Processor {
    constructor(func: any, options: any);
    func: any;
    funcRes: any;
    options: any;
    _shouldUpdateSelector(rule: any, options?: {}): boolean;
    _isLossy(options?: {}): boolean;
    _root(rule: any, options?: {}): import("./selectors/root").default;
    _parseOptions(options: any): {
        lossy: boolean;
    };
    _run(rule: any, options?: {}): Promise<any>;
    _runSync(rule: any, options?: {}): {
        transform: any;
        root: import("./selectors/root").default;
        string: any;
    };
    ast(rule: postcss.Rule | string, options: any): Promise<parser.Root>;
    astSync(rule: postcss.Rule | string, options: any): parser.Root;
    transform(rule: postcss.Rule | string, options: any): Promise<any>;
    transformSync(rule: postcss.Rule | string, options: any): any;
    process(rule: postcss.Rule | string, options: any): string;
    processSync(rule: postcss.Rule | string, options: any): string;
}
