declare const isWindows: boolean;
declare const path: any;
declare const COLON: string;
declare const isexe: any;
declare const getNotFoundError: (cmd: any) => Error & {
    code: string;
};
declare const getPathInfo: (cmd: any, opt: any) => {
    pathEnv: any[];
    pathExt: any;
    pathExtExe: any;
};
declare const which: {
    (cmd: any, opt: any, cb: any): Promise<any>;
    sync: (cmd: any, opt: any) => any;
};
declare const whichSync: (cmd: any, opt: any) => any;
