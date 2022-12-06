export default Delegator;
declare function Delegator(proto: any, target: any): any;
declare namespace Delegator {
    var auto: (proto: any, targetProto: any, targetProp: any) => void;
}
