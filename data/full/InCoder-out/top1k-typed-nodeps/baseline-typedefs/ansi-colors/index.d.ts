declare const isObject: (val: any) => boolean;
declare const ANSI_REGEX: RegExp;
declare const hasColor: () => boolean;
declare const create: () => {
    enabled: boolean;
    visible: boolean;
    styles: {};
    keys: {};
};
