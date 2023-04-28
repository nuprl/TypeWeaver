declare var Parser: {
    parseHeader: (header: string) => any;
    serializeParams: (name: string, params: any[]) => string;
}, Pipeline: any;
declare var Extensions: () => void;
declare var instance: {
    add: (ext: string) => void;
    generateOffer: () => string;
    activate: (header: string) => void;
    generateResponse: (header: string) => string;
    validFrameRsv: (frame: any) => boolean;
    processIncomingMessage: (message: string, callback: Function, context: any) => void;
    processOutgoingMessage: (message: string, callback: Function, context: any) => void;
    close: (callback: Function, context: any) => any;
    _reserve: (ext: string) => void;
    _reserved: (ext: string) => false | any[];
};
