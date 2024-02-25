export default Promise;
declare class Promise {
    constructor(resolver: any, label: any);
    _id: number;
    _label: any;
    _state: any;
    _result: any;
    _subscribers: any[];
    _onError(reason: any): void;
    catch(onRejection: Function, label?: string): Promise;
    finally(callback: Function, label?: string): Promise;
    _guidKey: string;
    then: typeof then;
}
declare namespace Promise {
    export { Resolve as cast };
    export { all };
    export { race };
    export { Resolve as resolve };
    export { Reject as reject };
}
import then from "./then";
import Resolve from "./promise/resolve";
import all from "./promise/all";
import race from "./promise/race";
import Reject from "./promise/reject";
