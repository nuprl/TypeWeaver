export default depd;
/**
 * Create deprecate for namespace in caller.
 */
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
/**
 * Return a wrapped function in a deprecation message.
 */
declare function wrapfunction(fn: any, message: any): any;
/**
 * Wrap property in a deprecation message.
 */
declare function wrapproperty(obj: any, prop: any, message: any): void;
