export default chownr;
declare function chownr(p: any, uid: any, gid: any, cb: any): void;
declare namespace chownr {
    export { chownrSync as sync };
}
declare function chownrSync(p: any, uid: any, gid: any): void;
