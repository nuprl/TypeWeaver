export default stringify;
export declare const getSerialize: typeof serializer;
declare function stringify(obj: any, replacer: any, spaces: any, cycleReplacer: any): string;
declare function serializer(replacer: any, cycleReplacer: any): (key: any, value: any) => any;
