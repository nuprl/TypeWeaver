export default class MIMEType {
    constructor(string: any);
    static parse(string: any): MIMEType;
    get essence(): string;
    get type(): any;
    set type(value: any);
    get subtype(): any;
    set subtype(value: any);
    get parameters(): any;
    toString(): string;
    isJavaScript({ prohibitParameters }?: {
        prohibitParameters?: boolean;
    }): boolean;
    isXML(): any;
    isHTML(): boolean;
}
