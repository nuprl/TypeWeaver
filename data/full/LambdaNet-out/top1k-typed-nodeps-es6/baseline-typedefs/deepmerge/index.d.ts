declare function deepmerge(target: any[], source: string, options: object): any[];
declare namespace deepmerge {
    var all: (array: any[], options: object) => object;
}
export default deepmerge;
