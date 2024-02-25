export { DOMExceptionImpl as implementation };
export function init(impl: any): void;
declare class DOMExceptionImpl {
    constructor(globalObject: any, [message, name]: [any, any]);
    name: any;
    message: any;
    get code(): any;
}
