declare const CHAR_CODE_NEW_LINE: number;
declare const getGeneratedSourceInfo: (source: any) => {
    generatedLine?: undefined;
    generatedColumn?: undefined;
    source?: undefined;
} | {
    generatedLine: number;
    generatedColumn: any;
    source: any;
};
