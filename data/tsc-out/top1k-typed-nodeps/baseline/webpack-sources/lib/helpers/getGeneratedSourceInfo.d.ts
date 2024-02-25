export = getGeneratedSourceInfo;
declare function getGeneratedSourceInfo(source: any): {
    generatedLine?: undefined;
    generatedColumn?: undefined;
    source?: undefined;
} | {
    generatedLine: number;
    generatedColumn: any;
    source: any;
};
