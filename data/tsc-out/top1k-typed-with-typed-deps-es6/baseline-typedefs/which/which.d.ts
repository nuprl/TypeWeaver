export default which;
declare function which(cmd: any, opt: any, cb: any): Promise<any>;
declare namespace which {
    export { whichSync as sync };
}
declare function whichSync(cmd: any, opt: any): string | string[];
