declare var Parser: {
    parseHeader: (header: string) => any;
    serializeParams: (name: string, params: any[]) => string;
}, Pipeline: any;
declare var Extensions: () => void;
declare var instance: {
    add: (ext: Extension) => void;
    generateOffer: () => string;
    activate: (header: string) => void;
    generateResponse: (header: string) => string;
    validFrameRsv: (frame: Frame) => boolean;
    processIncomingMessage: (message: any, callback: Function, context: any) => void;
    processOutgoingMessage: (message: any, callback: Function, context: any) => void;
    close: (callback: Function, context: any) => any;
    _reserve: (ext: Extension) => void;
    _reserved: (ext: Extensions) => false | any[];
};
