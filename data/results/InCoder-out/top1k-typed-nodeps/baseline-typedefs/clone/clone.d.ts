declare var clone: {
    (parent: Object, circular: Boolean, depth: Number, prototype: Object, includeNonEnumerable: false): any;
    clonePrototype(parent: any): any;
    __objToStr: (o: object) => any;
    __isDate: (o: Object) => boolean;
    __isArray: (o: any) => boolean;
    __isRegExp: (o: object) => boolean;
    __getRegExpFlags: (re: RegExp) => string;
};
