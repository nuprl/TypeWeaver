/*!
 * depd
 * Copyright(c) 2014-2018 Douglas Christopher Wilson
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
declare function wrapfunction(fn: Function, message: string): any;
declare function wrapproperty(obj: any, prop: string, message: string): void;
