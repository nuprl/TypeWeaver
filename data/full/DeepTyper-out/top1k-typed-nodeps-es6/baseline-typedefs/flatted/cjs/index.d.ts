declare const $parse: (text: string, reviver?: (this: any, key: string, value: any) => any) => any, $stringify: {
    (value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
    (value: any, replacer?: (string | number)[], space?: string | number): string;
};
declare const keys: {
    (o: object): string[];
    (o: {}): string[];
};
declare const Primitive: any;
declare const primitive: string;
declare const ignore: {};
declare const object: any;
declare const noop: void;
declare const primitives: any;
declare const Primitives: any;
declare const revive: any;
declare const set: (known: any, input: any, value: any) => any;
declare const parse: any;
declare const stringify: any;
declare const toJSON: any;
declare const fromJSON: any;
