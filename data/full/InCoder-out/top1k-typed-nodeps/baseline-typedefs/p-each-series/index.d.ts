declare const pEachSeries: {
    (iterable: any, iterator: any): Promise<any>;
    stop: symbol;
};
export default pEachSeries;
