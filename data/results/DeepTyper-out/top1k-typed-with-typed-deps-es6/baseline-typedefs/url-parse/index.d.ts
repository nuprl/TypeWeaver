declare function lolcation(loc: any): any;
declare function Url(address: string, location: any, parser: any): any;
declare namespace Url {
    var extractProtocol: (address: string, location: any) => void;
    var location: typeof lolcation;
    var trimLeft: (str: string) => string;
    var qs: typeof import("querystringify");
}
export default Url;
