declare function readFileSync(file: string, options: {}, ReadFileSyncOptions: any): any;
declare function writeFileSync(file: string, obj: any, options: {}, any: any): any;
declare const jsonfile: {
    readFile: (...args: any[]) => void | Promise<any>;
    readFileSync: typeof readFileSync;
    writeFile: (...args: any[]) => void | Promise<any>;
    writeFileSync: typeof writeFileSync;
};
export default jsonfile;
