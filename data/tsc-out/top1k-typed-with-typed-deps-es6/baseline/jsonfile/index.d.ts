export default jsonfile;
declare namespace jsonfile {
    export { readFile };
    export { readFileSync };
    export { writeFile };
    export { writeFileSync };
}
declare const readFile: (...args: any[]) => void | Promise<any>;
declare function readFileSync(file: any, options?: {}): any;
declare const writeFile: (...args: any[]) => void | Promise<any>;
declare function writeFileSync(file: any, obj: any, options?: {}): any;
