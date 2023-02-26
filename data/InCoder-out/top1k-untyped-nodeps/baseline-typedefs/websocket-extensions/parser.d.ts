declare var TOKEN: RegExp, NOTOKEN: RegExp, QUOTED: RegExp, PARAM: RegExp, EXT: RegExp, EXT_LIST: RegExp, NUMBER: RegExp;
declare var hasOwnProperty: (v: PropertyKey) => boolean;
declare var Parser: {
    parseHeader: (header: Header) => any;
    serializeParams: (name: String, params: Object) => string;
};
declare var Offers: () => void;
