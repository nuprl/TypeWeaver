declare var fs: any, join: any, resolve: any, dirname: any, defaultOptions: {
    extensions: string[];
    recurse: boolean;
    rename: (name: any) => any;
    visit: (obj: any) => any;
};
declare function checkFileInclusion(path: string, filename: string, options: any): string;
declare function requireDirectory(m: any, path: string, options: any): any;
