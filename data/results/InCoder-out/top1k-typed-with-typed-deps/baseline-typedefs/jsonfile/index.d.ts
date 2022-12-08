/// <reference types="node" />
declare let _fs: any;
declare const universalify: any;
declare const stringify: any, stripBom: any;
declare function _readFile(file: File, options: {}, FileReadOptions: any): Promise<any>;
declare const readFile: any;
declare function readFileSync(file: string | Buffer, options: {}, ReadFileOptions: any): any;
declare function _writeFile(file: File, obj: any, options: {}, WriteFileOptions: any): Promise<void>;
declare const writeFile: any;
declare function writeFileSync(file: string | Buffer, obj: any, options: {}, WriteFileOptions: any): any;
declare const jsonfile: {
    readFile: any;
    readFileSync: typeof readFileSync;
    writeFile: any;
    writeFileSync: typeof writeFileSync;
};
