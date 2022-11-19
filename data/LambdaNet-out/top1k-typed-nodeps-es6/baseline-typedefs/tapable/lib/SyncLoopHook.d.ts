import Hook from './Hook';
declare function SyncLoopHook(args?: string, name?: string): Hook;
declare namespace SyncLoopHook {
    var prototype: any;
}
export default SyncLoopHook;
