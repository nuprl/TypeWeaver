declare function requireDirectory(m: any, path: string, options: any): {};
export default requireDirectory;
export declare const defaults: {
    extensions: string[];
    recurse: boolean;
    rename: (name: string) => string;
    visit: (obj: any) => any;
};
