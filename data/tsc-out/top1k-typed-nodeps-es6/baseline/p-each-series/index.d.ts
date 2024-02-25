export default pEachSeries;
declare function pEachSeries(iterable: any, iterator: any): Promise<any>;
declare namespace pEachSeries {
    const stop: symbol;
}
