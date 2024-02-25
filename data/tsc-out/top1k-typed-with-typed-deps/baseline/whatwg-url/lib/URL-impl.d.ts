export { URLImpl as implementation };
declare class URLImpl {
    constructor(globalObject: any, constructorArgs: any);
    _url: any;
    _query: any;
    set href(arg: string);
    get href(): string;
    get origin(): any;
    set protocol(arg: string);
    get protocol(): string;
    set username(arg: any);
    get username(): any;
    set password(arg: any);
    get password(): any;
    set host(arg: any);
    get host(): any;
    set hostname(arg: any);
    get hostname(): any;
    set port(arg: string);
    get port(): string;
    set pathname(arg: any);
    get pathname(): any;
    set search(arg: string);
    get search(): string;
    get searchParams(): any;
    set hash(arg: string);
    get hash(): string;
    toJSON(): string;
}
