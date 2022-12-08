export default Delegator;
declare function Delegator(proto: object, target: HTMLElement): string;
declare namespace Delegator {
    var auto: (proto: any[], targetProto: any[], targetProp: number) => void;
}
