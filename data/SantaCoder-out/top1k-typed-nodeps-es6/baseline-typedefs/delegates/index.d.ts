export default Delegator;
declare function Delegator(proto: Object, target: Object): any;
declare namespace Delegator {
    var auto: (proto: Object, targetProto: Object, targetProp: string) => void;
}
