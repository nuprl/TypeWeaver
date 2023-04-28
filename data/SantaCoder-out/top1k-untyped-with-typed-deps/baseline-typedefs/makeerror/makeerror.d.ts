declare var tmpl: any;
declare function BaseError(): void;
declare namespace BaseError {
    var prototype: Error;
}
declare function makeError(name: string, defaultMessage: string, defaultData: any): (message: string, data: any) => any;
