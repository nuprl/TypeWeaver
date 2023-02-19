declare function deepmerge(target: any, source: any, options: any): any;
declare namespace deepmerge {
    var all: (array: any[], options: DeepMergeOptions) => any;
}
export default deepmerge;
