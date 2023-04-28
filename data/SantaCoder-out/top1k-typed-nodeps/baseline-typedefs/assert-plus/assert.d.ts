declare var assert: any;
declare var Stream: any;
declare var util: any;
declare var UUID_REGEXP: RegExp;
declare function _capitalize(str: string): string;
declare function _toss(name: string, expected: string, oper: string, arg: any, actual: any): void;
declare function _getClass(arg: any): any;
declare function noop(): void;
declare var types: {
    bool: {
        check: (arg: any) => boolean;
    };
    func: {
        check: (arg: any) => boolean;
    };
    string: {
        check: (arg: any) => boolean;
    };
    object: {
        check: (arg: any) => boolean;
    };
    number: {
        check: (arg: any) => boolean;
    };
    finite: {
        check: (arg: any) => boolean;
    };
    buffer: {
        check: (arg: any) => boolean;
        operator: string;
    };
    array: {
        check: (arg: any) => boolean;
        operator: string;
    };
    stream: {
        check: (arg: any) => boolean;
        operator: string;
        actual: typeof _getClass;
    };
    date: {
        check: (arg: any) => boolean;
        operator: string;
        actual: typeof _getClass;
    };
    regexp: {
        check: (arg: any) => boolean;
        operator: string;
        actual: typeof _getClass;
    };
    uuid: {
        check: (arg: any) => boolean;
        operator: string;
    };
};
declare function _setExports(ndebug: boolean): any;
