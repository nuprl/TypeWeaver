declare const fs: any;
declare const path: any;
declare const LCHOWN: string;
declare const LCHOWNSYNC: string;
declare const needEISDIRHandled: boolean;
declare const lchownSync: (path: any, uid: any, gid: any) => any;
declare const chownSync: (path: any, uid: any, gid: any) => any;
declare const handleEISDIR: (_: any, __: any, ___: any, cb: any) => any;
declare const handleEISDirSync: (path: any, uid: any, gid: any) => any;
declare const nodeVersion: string;
declare let readdir: (path: any, options: any, cb: any) => any;
declare let readdirSync: (path: any, options: any) => any;
declare const chown: (cpath: any, uid: any, gid: any, cb: any) => void;
declare const chownrKid: (p: any, child: any, uid: any, gid: any, cb: any) => any;
declare const chownr: {
    (p: any, uid: any, gid: any, cb: any): void;
    sync: (p: any, uid: any, gid: any) => any;
};
declare const chownrKidSync: (p: any, child: any, uid: any, gid: any) => void;
declare const chownrSync: (p: any, uid: any, gid: any) => any;
