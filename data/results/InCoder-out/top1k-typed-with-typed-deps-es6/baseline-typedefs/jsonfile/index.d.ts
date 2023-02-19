/// <reference types="node" />
declare function readFileSync(file: string | Buffer, options: {}, ReadFileOptions: any): any;
declare function writeFileSync(file: string | Buffer, obj: any, options: {}, WriteFileOptions: any): any;
declare const jsonfile: {
    readFile: (...args: any[]) => void | Promise<any>;
    readFileSync: typeof readFileSync;
    writeFile: (...args: any[]) => void | Promise<any>;
    writeFileSync: typeof writeFileSync;
};
export default jsonfile;
