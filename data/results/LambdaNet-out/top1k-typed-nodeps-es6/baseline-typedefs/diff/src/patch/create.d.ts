export declare function structuredPatch(oldFileName: string, newFileName: string, oldStr: string, newStr: string, oldHeader: string, newHeader: string, options: object): object;
export declare function formatPatch(diff: object): string;
export declare function createTwoFilesPatch(oldFileName: string, newFileName: string, oldStr: string, newStr: number, oldHeader: number, newHeader: number, options: object): string;
export declare function createPatch(fileName: string, oldStr: string, newStr: string, oldHeader: string, newHeader: number, options: object): string;
