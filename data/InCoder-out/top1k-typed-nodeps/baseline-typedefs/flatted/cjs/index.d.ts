declare const $parse: (text: string, reviver?: (this: any, key: string, value: any) => any) => any, $stringify: {
    (value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
    (value: any, replacer?: (string | number)[], space?: string | number): string;
};
declare const keys: {
    (o: object): string[];
    (o: {}): string[];
};
declare const Primitive: StringConstructor;
declare const primitive = "string";
declare const ignore: {};
declare const object = "object";
declare const noop: (_: any, value: any) => any;
declare const primitives: (value: any) => any;
declare const Primitives: (_: any, value: any) => any;
declare const revive: (input: any, parsed: any, output: any, $: any) => any;
declare const set: (known: any, input: any, value: any) => string;
declare const parse: (text: any, reviver: any) => any;
declare const stringify: (value: any, replacer: any, space: any) => string;
declare const toJSON: (any: any) => any;
declare const fromJSON: (any: any) => any;
