declare var Parser: {
    parseHeader: (header: string) => any;
    serializeParams: (name: string, params: any) => string;
};
export default Parser;
