export default class MIMEType {
    static parse(string: any): MIMEType;
    constructor(string: any);
    _type: any;
    _subtype: any;
    _parameters: MIMETypeParameters;
    get essence(): string;
    set type(arg: any);
    get type(): any;
    set subtype(arg: any);
    get subtype(): any;
    get parameters(): MIMETypeParameters;
    toString(): string;
    isJavaScript({ prohibitParameters }?: {
        prohibitParameters?: boolean;
    }): boolean;
    isXML(): any;
    isHTML(): boolean;
}
import MIMETypeParameters from "./mime-type-parameters.js";
