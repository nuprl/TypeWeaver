declare const optsArg: any;
declare const pathArg: any;
declare const mkdirpNative: any, mkdirpNativeSync: any;
declare const mkdirpManual: any, mkdirpManualSync: any;
declare const useNative: any, useNativeSync: any;
declare const mkdirp: {
    (path: any, opts: any): any;
    sync: (path: any, opts: any) => any;
    native(path: any, opts: any): any;
    manual(path: any, opts: any): any;
    nativeSync(path: any, opts: any): any;
    manualSync(path: any, opts: any): any;
};
declare const mkdirpSync: (path: any, opts: any) => any;
