/// <reference types="node" />
declare function stringify(obj: any, { EOL, any, finalEOL, boolean, replacer, string, spaces }: {
    EOL?: string;
    any: any;
    finalEOL?: boolean;
    boolean: any;
    replacer?: any;
    string: any;
    spaces: any;
}, Props: any): string;
declare function stripBom(content: Buffer): any;
