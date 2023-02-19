declare const which: {
    (cmd: any, opt: any, cb: any): Promise<any>;
    sync: (cmd: any, opt: any) => string | any[];
};
export default which;
