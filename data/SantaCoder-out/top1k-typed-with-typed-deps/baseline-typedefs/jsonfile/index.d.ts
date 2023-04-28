declare let _fs: any;
declare const universalify: any;
declare const stringify: any, stripBom: any;
declare function _readFile(file: string, options: {}, Object: any): Promise<any>;
declare const readFile: any;
declare function readFileSync(file: string, options: {}, Options: any): any;
declare function _writeFile(file: string, obj: any, options: {}, any: any): Promise<void>;
declare const writeFile: any;
declare function writeFileSync(file: string, obj: any, options: {}, Options: any): any;
declare const jsonfile: {
    readFile: any;
    readFileSync: typeof readFileSync;
    writeFile: any;
    writeFileSync: typeof writeFileSync;
};
