declare namespace _default {
    function mixin(object: any): any;
    function on(eventName: string, callback: Function): void;
    function off(eventName: string, callback?: Function): void;
    function trigger(eventName: string, options?: any, label: any): void;
}
export default _default;
