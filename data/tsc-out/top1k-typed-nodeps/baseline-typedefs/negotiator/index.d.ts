export = Negotiator;
declare function Negotiator(request: object): Negotiator;
declare class Negotiator {
    constructor(request: object);
    request: any;
    charset(available: any): any;
    charsets(available: any): any;
    encoding(available: any): any;
    encodings(available: any): any;
    language(available: any): any;
    languages(available: any): any;
    mediaType(available: any): any;
    mediaTypes(available: any): any;
    preferredCharset: any;
    preferredCharsets: any;
    preferredEncoding: any;
    preferredEncodings: any;
    preferredLanguage: any;
    preferredLanguages: any;
    preferredMediaType: any;
    preferredMediaTypes: any;
}
declare namespace Negotiator {
    export { Negotiator };
}
