#!/usr/bin/env node
declare var nopt: any;
declare var Stream: any;
declare var path: any;
declare var knownOpts: {
    foo: StringConstructor[];
    bar: any[];
    baz: any;
    bloo: string[];
    flag: BooleanConstructor;
    pick: BooleanConstructor;
};
declare var shortHands: {
    foofoo: string[];
    b7: string[];
    m: string[];
    p: string[];
    f: string[];
    g: string[];
    s: string;
};
declare var parsed: any;
