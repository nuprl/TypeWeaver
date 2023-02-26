/*!
 * depd
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
export default depd;
declare function depd(namespace: string): {
    (message: string): void;
    _file: any;
    _ignored: boolean;
    _namespace: string;
    _traced: boolean;
    _warned: any;
    function: typeof wrapfunction;
    property: typeof wrapproperty;
};
declare function wrapfunction(fn: Function, message: string): Function;
declare function wrapproperty(obj: any, prop: string, message: string): void;
