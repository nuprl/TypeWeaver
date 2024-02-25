export function structuredPatch(oldFileName: any, newFileName: any, oldStr: any, newStr: any, oldHeader: any, newHeader: any, options: any): {
    oldFileName: any;
    newFileName: any;
    oldHeader: any;
    newHeader: any;
    hunks: {
        oldStart: number;
        oldLines: number;
        newStart: number;
        newLines: number;
        lines: any;
    }[];
};
export function formatPatch(diff: any): string;
export function createTwoFilesPatch(oldFileName: any, newFileName: any, oldStr: any, newStr: any, oldHeader: any, newHeader: any, options: any): string;
export function createPatch(fileName: any, oldStr: any, newStr: any, oldHeader: any, newHeader: any, options: any): string;
