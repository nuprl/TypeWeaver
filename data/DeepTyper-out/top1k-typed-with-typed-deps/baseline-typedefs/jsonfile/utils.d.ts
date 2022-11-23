declare function stringify(obj: any, { EOL, finalEOL, replacer, spaces }?: {
    EOL?: string;
    finalEOL?: boolean;
    replacer?: any;
    spaces: any;
}): string;
declare function stripBom(content: string): string;
