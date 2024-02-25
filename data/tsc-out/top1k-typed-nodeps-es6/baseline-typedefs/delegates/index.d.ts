export default Delegator;
declare function Delegator(proto: any, target: string): Delegator;
declare class Delegator {
    constructor(proto: any, target: string);
    proto: any;
    target: string;
    methods: any[];
    getters: any[];
    setters: any[];
    fluents: any[];
    method(name: string): Delegator;
    access(name: string): Delegator;
    getter(name: string): Delegator;
    setter(name: string): Delegator;
    fluent(name: string): Delegator;
}
declare namespace Delegator {
    function auto(proto: any, targetProto: any, targetProp: string): void;
}
