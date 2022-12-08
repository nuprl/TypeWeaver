declare function lolcation(loc: object): object;
declare function Url(address: any[], location: object, parser: Function): string;
declare namespace Url {
    var extractProtocol: (address: string, location: object) => object;
    var location: typeof lolcation;
    var trimLeft: (str: string) => string;
    var qs: typeof import("querystringify");
}
export default Url;
