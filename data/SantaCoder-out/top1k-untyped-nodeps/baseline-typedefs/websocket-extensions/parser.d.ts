declare var TOKEN: RegExp, NOTOKEN: RegExp, QUOTED: RegExp, PARAM: RegExp, EXT: RegExp, EXT_LIST: RegExp, NUMBER: RegExp;
declare var hasOwnProperty: (v: PropertyKey) => boolean;
declare var Parser: {
    parseHeader: (header: string) => any;
    serializeParams: (name: string, params: any[]) => string;
};
declare var Offers: () => void;
