export declare function structuredPatch(oldFileName: string, newFileName: string, oldStr: string, newStr: string, oldHeader: string, newHeader: string, options: any): string;
export declare function formatPatch(diff: string): string;
export declare function createTwoFilesPatch(oldFileName: string, newFileName: string, oldStr: string, newStr: string, oldHeader: string, newHeader: string, options: any): string;
export declare function createPatch(fileName: string, oldStr: string, newStr: string, oldHeader: string, newHeader: string, options: any): string;
