declare const $parse: (text: string, reviver?: (this: any, key: string, value: any) => any) => any, $stringify: {
    (value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
    (value: any, replacer?: (string | number)[], space?: string | number): string;
};
declare const keys: {
    (o: object): string[];
    (o: {}): string[];
};
declare const Primitive: string;
declare const primitive: string;
declare const ignore: Function;
declare const object: string;
declare const noop: Function;
declare const primitives: Function;
declare const Primitives: Function;
declare const revive: Function;
declare const set: Function;
declare const parse: Function;
declare const stringify: Function;
declare const toJSON: Function;
declare const fromJSON: Function;
