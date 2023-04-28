export default inflight;
declare function inflight(unique: string, doFly: Function): any;
declare namespace inflight {
    var active: {};
}
