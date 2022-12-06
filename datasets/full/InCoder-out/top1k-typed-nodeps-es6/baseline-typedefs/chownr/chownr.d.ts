declare const chownr: {
    (p: any, uid: any, gid: any, cb: any): void;
    sync: (p: any, uid: any, gid: any) => void;
};
export default chownr;
