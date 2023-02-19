declare const getGeneratedSourceInfo: (source: any) => {
    generatedLine?: undefined;
    generatedColumn?: undefined;
    source?: undefined;
} | {
    generatedLine: number;
    generatedColumn: any;
    source: any;
};
export default getGeneratedSourceInfo;
