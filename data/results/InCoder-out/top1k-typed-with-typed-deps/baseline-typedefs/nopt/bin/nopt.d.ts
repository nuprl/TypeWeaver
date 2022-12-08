#!/usr/bin/env node
declare var nopt: any;
declare var path: any;
declare var types: {
    num: NumberConstructor;
    bool: BooleanConstructor;
    help: BooleanConstructor;
    list: ArrayConstructor;
    'num-list': (NumberConstructor | ArrayConstructor)[];
    'str-list': (StringConstructor | ArrayConstructor)[];
    'bool-list': (BooleanConstructor | ArrayConstructor)[];
    str: StringConstructor;
    clear: BooleanConstructor;
    config: BooleanConstructor;
    length: NumberConstructor;
    file: any;
};
declare var shorthands: {
    s: string[];
    b: string[];
    nb: string[];
    tft: string[];
    '?': string[];
    h: string[];
    H: string[];
    n: string[];
    c: string[];
    l: string[];
    f: string[];
};
declare var parsed: any;
