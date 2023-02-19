declare function stringify(obj: Function, { EOL, finalEOL, replacer, spaces }?: {
    EOL?: string;
    finalEOL?: boolean;
    replacer?: any;
    spaces: any;
}): void;
declare function stripBom(content: string): string;
