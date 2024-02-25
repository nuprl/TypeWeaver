export = stringify;
declare function stringify(obj: any, replacer: any, spaces: any, cycleReplacer: any): string;
declare namespace stringify {
    export { serializer as getSerialize };
}
declare function serializer(replacer: any, cycleReplacer: any): (key: any, value: any) => any;
