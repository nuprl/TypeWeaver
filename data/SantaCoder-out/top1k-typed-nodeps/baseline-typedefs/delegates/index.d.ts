declare function Delegator(proto: Object, target: Object): any;
declare namespace Delegator {
    var auto: (proto: any, targetProto: any, targetProp: string) => void;
}
