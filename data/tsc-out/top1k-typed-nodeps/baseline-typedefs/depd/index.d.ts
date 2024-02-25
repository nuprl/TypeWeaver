export = depd;
declare function depd(namespace: any): {
    (message: any): void;
    _file: any;
    _ignored: boolean;
    _namespace: any;
    _traced: boolean;
    _warned: any;
    function: typeof wrapfunction;
    property: typeof wrapproperty;
};
declare function wrapfunction(fn: any, message: any): any;
declare function wrapproperty(obj: any, prop: any, message: any): void;
