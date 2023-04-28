declare var clone: {
    (parent: any, circular: any, depth: any, prototype: any, includeNonEnumerable: any): any;
    clonePrototype(parent: any): any;
    __objToStr: (o: any) => any;
    __isDate: (o: any) => boolean;
    __isArray: (o: any) => boolean;
    __isRegExp: (o: any) => boolean;
    __getRegExpFlags: (re: RegExp) => string;
};
