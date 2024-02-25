declare function _exports(gen: any, ...args: any[]): Promise<any>;
declare namespace _exports {
    function _default(gen: any, ...args: any[]): Promise<any>;
    namespace _default {
        export { co };
        export function wrap(fn: GeneratorFunction): Function;
    }
    export { _default as default };
}
export = _exports;
declare function co(gen: any, ...args: any[]): Promise<any>;
declare namespace co { }
