declare var Parser: any, Pipeline: any;
declare var Extensions: () => void;
declare var instance: {
    add: (ext: Extension) => void;
    generateOffer: () => string;
    activate: (header: Header) => void;
    generateResponse: (header: ResponseHeader) => string;
    validFrameRsv: (frame: Frame) => boolean;
    processIncomingMessage: (message: any, callback: any, context: any) => void;
    processOutgoingMessage: (message: any, callback: any, context: any) => void;
    close: (callback: Function, context: any) => any;
    _reserve: (ext: Extension) => void;
    _reserved: (ext: Extension) => false | any[];
};
