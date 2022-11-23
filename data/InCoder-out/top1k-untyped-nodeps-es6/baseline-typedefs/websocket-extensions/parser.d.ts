declare var Parser: {
    parseHeader: (header: Header) => any;
    serializeParams: (name: String, params: Object) => string;
};
export default Parser;
