/*!
 * statuses
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
export default status;
declare function status(code: number): any;
declare namespace status {
    var message: any;
    var code: {};
    var codes: unknown[];
    var redirect: {
        300: boolean;
        301: boolean;
        302: boolean;
        303: boolean;
        305: boolean;
        307: boolean;
        308: boolean;
    };
    var empty: {
        204: boolean;
        205: boolean;
        304: boolean;
    };
    var retry: {
        502: boolean;
        503: boolean;
        504: boolean;
    };
}
