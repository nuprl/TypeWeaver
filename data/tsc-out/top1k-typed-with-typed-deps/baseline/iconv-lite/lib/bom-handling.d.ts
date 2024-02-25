declare function PrependBOMWrapper(encoder: any, options: any): void;
declare class PrependBOMWrapper {
    constructor(encoder: any, options: any);
    encoder: any;
    addBOM: boolean;
    write(str: any): any;
    end(): any;
}
declare function StripBOMWrapper(decoder: any, options: any): void;
declare class StripBOMWrapper {
    constructor(decoder: any, options: any);
    decoder: any;
    pass: boolean;
    options: any;
    write(buf: any): any;
    end(): any;
}
export { PrependBOMWrapper as PrependBOM, StripBOMWrapper as StripBOM };
