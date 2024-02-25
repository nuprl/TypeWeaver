export = Accepts;
declare function Accepts(req: object): Accepts;
declare class Accepts {
    constructor(req: object);
    headers: any;
    negotiator: Negotiator;
    public type: (types_: any, ...args: any[]) => string | any[] | boolean;
    public types(types_: any, ...args: any[]): string | any[] | boolean;
    public encoding: (encodings_: any, ...args: any[]) => string | any[];
    public encodings(encodings_: any, ...args: any[]): string | any[];
    public charset: (charsets_: any, ...args: any[]) => string | any[];
    public charsets(charsets_: any, ...args: any[]): string | any[];
    public lang: (languages_: any, ...args: any[]) => any[] | string;
    public langs: (languages_: any, ...args: any[]) => any[] | string;
    public language: (languages_: any, ...args: any[]) => any[] | string;
    public languages(languages_: any, ...args: any[]): any[] | string;
}
import Negotiator = require("negotiator");
